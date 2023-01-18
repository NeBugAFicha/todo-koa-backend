import { Next } from 'koa';
import { Context, RouteInterface } from '../controllers/Types';
export default (schema: RouteInterface) => {
  return async (ctx: Context<RouteInterface>, next: Next) => {
    for (const part in schema) {
      const { error, value } = schema[part].validate(ctx.request[part]);
      if (error) {
        ctx.throw(400, JSON.stringify({ name: 'Validation Error', details: error.details }));
      }
      Object.keys(value).forEach((key) => (ctx.request[part][key] = value[key]));
    }
    await next();
  };
};
