import db from '../db/database';
import { Grants } from '../grants';

class Task {
    static async checkGrants(ctx: any, params: any){
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
            ctx.throw(403, `No ${Grants[grant_id]} or Owner Grant`)
        }
    }
    async create(ctx: any){
        const {task_list_id} = ctx.request.params;
        const {user_id} = ctx.request;
    
        await Task.checkGrants(ctx, {task_list_id, user_id, grant_id: Grants.Create});
        
        const {name} = ctx.request.body;
        const result = await db.tasks.create({
            data: {name, task_list_id}
        });

        ctx.body = {data: result};
    }

    async findById(ctx: any){
        const {task_list_id, id} = ctx.request.params;
        const {user_id} = ctx.request;

        await Task.checkGrants(ctx, {task_list_id, user_id, grant_id: Grants.Read});
        const result = await db.tasks.findFirst({ where: { id } });

        ctx.body = {data: result};
    }

    async delete(ctx: any){
        const {task_list_id, id} = ctx.request.params;
        const {user_id} = ctx.request;

        await Task.checkGrants(ctx, {task_list_id, user_id, grant_id: Grants.Delete});

        const result = await db.tasks.delete({
            where: {id}
        })

        ctx.body = { data: result };
    }

    async update(ctx: any){
        const {task_list_id, id} = ctx.request.params;
        const {user_id} = ctx.request;

        await Task.checkGrants(ctx, {task_list_id, user_id, grant_id: Grants.Update});

        const {name} = ctx.request.body;
        const result = await db.tasks.update({
            where: {id},
            data: {name}
        })

        ctx.body = { data: result };
    }
};

export default new Task();