import db from '../../db/database';
import { Grants } from '../grants';
import { Context, RouteInterface, ControllerMethods } from '../Types';
import { Type } from './type';
import { Router } from './router';
import { Schema } from './schema';

type Methods = ControllerMethods<Type>;
class Grant implements Methods{
    readonly router = Router;
    readonly schema = Schema;
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

    grant: Methods['grant'] = async (ctx)=> {
        const {task_list_id} = ctx.request.params;
        const {grant, user_id, take_off} = ctx.request.query;
        console.log(grant);
        await Grant.checkOwner(ctx, {user_id, task_list_id});

        let result;
        if(take_off){
            result = await db.user_grant_task_lists.delete({
                where: {
                    task_list_id_user_id_grant_id: {
                        user_id, task_list_id, grant_id: Grants[grant]
                    }
                }
            });
        } else {
            result = await db.user_grant_task_lists.create({
                data: {user_id, task_list_id, grant_id: Grants[grant]}
            });
        }
        

        ctx.body = {data: result};
    }
};

export const grant = new Grant();