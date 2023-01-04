import db from '../../db/database';
import {Grants} from '../grants';
import { ControllerMethods } from '../Types';
import { Type } from './type';
import { Router } from './router';
import { Schema } from './schema';
import { empty } from '@prisma/client/runtime';
import { RestartProcess } from 'concurrently';

type Methods = ControllerMethods<Type>;
class TaskList implements Methods{
    readonly router = Router;
    readonly schema = Schema;
    create: Methods['create'] = async (ctx)=>{
        const {name} = ctx.request.body;
        const {user_id} = ctx.request;
    
        await db.$transaction(async (tx) => {
            const task_list = await tx.task_lists.create({ data: { name } });
            await tx.user_grant_task_lists.create({
                data: {
                    task_list_id: task_list.id,
                    grant_id: Grants.Owner,
                    user_id
                }
            })
            ctx.body = { data: task_list };
        })
    }

    findAll: Methods['findAll'] = async (ctx)=>{
        const {my_list} = ctx.request.query;
        const {user_id} = ctx.request;
        const grantCondition = my_list ? {grant_id: Grants.Owner} : {NOT: {grant_id: Grants.Owner}}
        const result = await db.task_lists.findMany({
            where: {
                user_grant_task_lists: {
                    some: {
                        user_id,
                        ...grantCondition
                    }
                }
            },
        })
        ctx.body = { data: result };
    }

    findById: Methods['findById'] = async (ctx)=>{
        const {user_id} = ctx.request;
        const {id} = ctx.request.params;

        const result: any = await db.task_lists.findFirstOrThrow({
            where: {id, user_grant_task_lists: {some:{user_id}}},
            include: {
                tasks: true,
                user_grant_task_lists: {select: {grants: true}, where: {user_id}},
            }
        })
        delete Object.assign(result, {grants: result.user_grant_task_lists.map(({grants})=>grants)}).user_grant_task_lists;
        const checkOwnerReadGrant = await db.user_grant_task_lists.findFirst({
            where:{
                task_list_id: id,
                user_id,
                grant_id: {
                    in: [Grants.Owner, Grants.Read]
                }
            }
        })

        if(!checkOwnerReadGrant){
            delete result.tasks;
        };

        ctx.body = { data: result };
    }

    delete: Methods['delete'] = async (ctx)=>{
        const {id} = ctx.request.params;
        const {user_id} = ctx.request;
        const checkOwner = await db.user_grant_task_lists.findFirstOrThrow({
            where: {
                user_id,
                grant_id: {
                    in: [Grants.Owner]
                },
                task_list_id: id,
            }     
        });
        if(!checkOwner) {
            ctx.throw('You cant delete task_lists of another user | task doesnt exists');
        };

        const result = await db.task_lists.delete({where: {id}})

        ctx.body = { data: result };
    }

    findAllByList: Methods['findAllByList'] = async (ctx)=>{
        const {list_id} = ctx.request.query;
        const {user_id} = ctx.request;

        const result = await db.task_lists.findMany({
            where: {
                user_grant_task_lists: {
                    some: {
                        grant_id: list_id ? Grants.Read : Grants.Owner,
                        user_id: list_id || user_id,
                    }
                }
            },
        })

        ctx.body = { data: result };
    }
}

export const taskList = new TaskList();