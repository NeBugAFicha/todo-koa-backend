import {Next} from 'koa'
import {Context, RouteInterface} from '../controllerType';
export default (schema: RouteInterface) => {
    return async (ctx: Context<RouteInterface>, next: Next) => {
        for(const part in schema){
            const validation = schema[part].validate(ctx.request[part])
            if(validation.error){
                ctx.throw(400, JSON.stringify({name: 'Validation Error', details: validation.error.details}));
            }
        }
        await next();
    }
}