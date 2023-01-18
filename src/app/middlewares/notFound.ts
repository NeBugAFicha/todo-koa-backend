import { Context, RouteInterface } from '../controllers/Types';

export default async (ctx: Context<RouteInterface>) => ctx.throw('Not Found');
