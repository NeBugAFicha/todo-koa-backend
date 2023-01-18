import { Next } from 'koa';
import { Context, RouteInterface } from '../controllers/Types';

export default async (ctx: Context<RouteInterface>, next: Next) => {
  try {
    ctx.status = 200;
    await next();
  } catch (error) {
    console.error(error.message);
    const message = error.message.split('\n');
    ctx.status = error.status || 500;
    ctx.body = {
      error: message[message.length - 1],
    };
  }
};
