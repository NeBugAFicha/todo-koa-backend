import jwt from 'jsonwebtoken';
import {Next} from 'koa'
import {Context, RouteInterface} from '../controllerType';

export default async (ctx: Context<RouteInterface>, next: Next) => {
    const userData = jwt.verify(ctx.request.headers.token, process.env.JWT_SECRET_KEY);
    if(!userData){
        ctx.throw(401, 'Unauthorized request')
    }
    ctx.request.user_id = userData.id;

    await next();
}