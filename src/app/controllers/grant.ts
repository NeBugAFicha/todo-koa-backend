import db from '../db/database';
import { Grants } from '../grants';
import { Context, RouteInterface, ControllerMethods } from '../controllerType';
import { GrantControllerType } from '../types/grantControllerType';

export type Methods = ControllerMethods<GrantControllerType>;
class Grant implements Methods{

    static async checkOwner(ctx: Context<RouteInterface>, params: {[key: string]: number}){
        const {user_id, task_list_id} = params; 
        const result = await db.user_grant_task_lists.findFirst({
            where: {
                grant_id: Grants.Owner,
                task_list_id,
            }     
        })

        if(!result){
            ctx.throw(500, `Task list doesnt exist`)
        }

        if(result.user_id === user_id) {
            ctx.throw(403, `You cant grant for this task list`)
        }
    }

    createGrant: Methods['createGrant'] = async (ctx)=> {
        const {task_list_id} = ctx.request.params;
        const {user_id} = ctx.request.query;
        
        await Grant.checkOwner(ctx, {user_id, task_list_id});

        const result = await db.user_grant_task_lists.create({
            data: {user_id, task_list_id, grant_id: Grants.Create}
        });

        ctx.body = {data: result};
    }

    readGrant: Methods['readGrant'] = async (ctx)=> {
        const {task_list_id} = ctx.request.params;
        const {user_id} = ctx.request.query;
        
        await Grant.checkOwner(ctx, {user_id, task_list_id});

        const result = await db.user_grant_task_lists.create({
            data: {user_id, task_list_id, grant_id: Grants.Read}
        });

        ctx.body = {data: result};
    }

    updateGrant: Methods['updateGrant'] = async (ctx)=> {
        const {task_list_id} = ctx.request.params;
        const {user_id} = ctx.request.query;
        
        await Grant.checkOwner(ctx, {user_id, task_list_id});

        const result = await db.user_grant_task_lists.create({
            data: {user_id, task_list_id, grant_id: Grants.Update}
        });

        ctx.body = {data: result};
    }

    deleteGrant: Methods['deleteGrant'] = async (ctx)=> {
        const {task_list_id} = ctx.request.params;
        const {user_id} = ctx.request.query;
        
        await Grant.checkOwner(ctx, {user_id, task_list_id});

        const result = await db.user_grant_task_lists.create({
            data: {user_id, task_list_id, grant_id: Grants.Delete}
        });

        ctx.body = {data: result};
    }
};

export default new Grant();