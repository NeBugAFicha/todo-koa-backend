import db from '../db/database';
import {Grants} from '../grants';

class TaskList {
    async create(ctx: any){
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

    async findAll(ctx: any){
        const {my_list} = ctx.request.query;
        const {user_id} = ctx.request;
        const grantCondition = my_list ? {grant_id: Grants.Owner} : {NOT: {grant_id: Grants.Owner}};

        const result = await db.user_grant_task_lists.findMany({
            where: {
                user_id,
                ...grantCondition
            },
            include: {
                task_lists: true,
            },
        })

        ctx.body = { data: result };
    }

    async findById(ctx: any){
        const {user_id} = ctx.request;
        const {id: task_list_id} = ctx.request.params;

        const result = await db.user_grant_task_lists.findFirst({
            where: {
                user_id,
                task_list_id,
            },
            include: {
                task_lists: true,
            },     
        })

        ctx.body = { data: result };
    }

    async delete(ctx: any){
        const {id} = ctx.request.params;

        const result = await db.task_lists.delete({where: {id}})

        ctx.body = { data: result };
    }

    async findAllByList(ctx: any){
        const {list_id} = ctx.request.params;

        const result = await db.user_grant_task_lists.findMany({
            where: {
                grant_id: list_id ? Grants.Read : Grants.Owner,
                ...list_id && {user_id: list_id},
            },
            include: {
                task_lists: true,
            }
        })

        ctx.body = { data: result };
    }
}

export default new TaskList();