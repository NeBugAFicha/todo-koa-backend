import {Next} from 'koa'
import {Context, RouteInterface} from '../controllers/Types';

export default async (ctx: Context<RouteInterface>, next: Next) => ctx.throw('Not Found');