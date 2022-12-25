import db from '../db/database';
import { Grants } from '../grants';
import task from './task';

class Grant {

    static async checkOwner(ctx: any, params){
        const {user_id, grant_id, task_list_id} = params; 
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
    async createGrant(ctx: any){
        const {task_list_id} = ctx.request.params;
        const {user_id} = ctx.request.query;
        
        await Grant.checkOwner(ctx, {user_id, task_list_id});

        const result = await db.user_grant_task_lists.create({
            data: {user_id, task_list_id, grant_id: Grants.Create}
        });

        ctx.body = {data: result};
    }

    async readGrant(ctx: any){
        const {task_list_id} = ctx.request.params;
        const {user_id} = ctx.request.query;
        
        await Grant.checkOwner(ctx, {user_id, task_list_id});

        const result = await db.user_grant_task_lists.create({
            data: {user_id, task_list_id, grant_id: Grants.Read}
        });

        ctx.body = {data: result};
    }

    async updateGrant(ctx: any){
        const {task_list_id} = ctx.request.params;
        const {user_id} = ctx.request.query;
        
        await Grant.checkOwner(ctx, {user_id, task_list_id});

        const result = await db.user_grant_task_lists.create({
            data: {user_id, task_list_id, grant_id: Grants.Update}
        });

        ctx.body = {data: result};
    }

    async deleteGrant(ctx: any){
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