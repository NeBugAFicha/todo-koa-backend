import db from '../db/database';
import {Grants} from '../grants';
import { ControllerMethods } from '../controllerType';
import { TaskListControllerType } from '../types/taskListControllerType';
import user from './user';
import { Prisma } from '@prisma/client';

export type Methods = ControllerMethods<TaskListControllerType>;
class TaskList implements Methods{
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
        const grantCondition = my_list ? {grant_id: Grants.Owner} : {NOT: {grant_id: Grants.Owner}};

        const result = await db.user_grant_task_lists.findMany({
            select: {
                task_lists: {
                    include: {
                        tasks: true,
                    },
                },
            },
            where: {
                user_id,
                ...grantCondition
            },
        })

        ctx.body = { data: result };
    }

    findById: Methods['findById'] = async (ctx)=>{
        const {user_id} = ctx.request;
        const {id} = ctx.request.params;

        const result = await db.user_grant_task_lists.findFirst({
            select: {
                task_lists: {
                    include: {
                        tasks: true,
                    },
                },
            },
            where: {
                user_id,
                task_list_id: Number(id),
            },
        })

        ctx.body = { data: result };
    }

    delete: Methods['delete'] = async (ctx)=>{
        const {id} = ctx.request.params;

        const result = await db.task_lists.delete({where: {id: Number(id)}})

        ctx.body = { data: result };
    }

    findAllByList: Methods['findAllByList'] = async (ctx)=>{
        const {list_id} = ctx.request.params;
        const {user_id} = ctx.request;

        const result = await db.user_grant_task_lists.findMany({
            where: {
                grant_id: Number(list_id) === user_id ? Grants.Owner : Grants.Read,
                user_id: Number(list_id),
            },
            include: {
                task_lists: {
                    include: {
                        tasks: true
                    }
                },
            }
        })

        ctx.body = { data: result };
    }
}

export default new TaskList();