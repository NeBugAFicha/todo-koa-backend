import db from '../../db/database';
import { Grants } from '../grants';
import { Context, RouteInterface, ControllerMethods } from '../Types';
import { Type } from './type';
import { Router } from './router';
import { Schema } from './schema';

type Methods = ControllerMethods<Type>;
class Task implements Methods{
    readonly router = Router;
    readonly schema = Schema;
    static async checkGrants(ctx: Context<RouteInterface>, params:  {[key: string]: number}){
        const {user_id, grant_id, task_list_id} = params; 
        const task_list = await db.user_grant_task_lists.findFirst({
            where: {
                user_id,
                grant_id: {
                    in: [Grants.Owner, grant_id]
                },
                task_list_id,
            }     
        })

        if(!task_list){
            ctx.throw(403, `No ${Grants[grant_id]} Grant or task list doesnt exist`)
        }
    }

    create: Methods['create'] = async (ctx)=>{
        const {task_list_id} = ctx.request.params;
        const {user_id} = ctx.request;

        await Task.checkGrants(ctx, {task_list_id, user_id, grant_id: Grants.Create});
        
        const {name} = ctx.request.body;
        const result = await db.tasks.create({
            data: {name, task_list_id}
        });

        ctx.body = {data: result};
    }

    findById: Methods['findById'] = async (ctx)=>{
        const {task_list_id, id} = ctx.request.params;
        const {user_id} = ctx.request;

        await Task.checkGrants(ctx, {task_list_id, user_id, grant_id: Grants.Read});
        const result = await db.tasks.findFirst({ where: { id } });

        ctx.body = {data: result};
    }

    delete: Methods['delete'] = async (ctx)=>{
        const {task_list_id, id} = ctx.request.params;
        const {user_id} = ctx.request;

        await Task.checkGrants(ctx, {task_list_id, user_id, grant_id: Grants.Delete});

        const result = await db.tasks.delete({ where: { id } })

        ctx.body = { data: result };
    }

    update: Methods['update'] = async (ctx)=>{
        const {task_list_id, id} = ctx.request.params;
        const {user_id} = ctx.request;

        await Task.checkGrants(ctx, {task_list_id, user_id, grant_id: Grants.Update});

        const {name} = ctx.request.body;
        const result = await db.tasks.update({
            where: { id },
            data: {name}
        })

        ctx.body = { data: result };
    }
};

export const task = new Task();