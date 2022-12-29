const start = Date.now();
import Koa from "koa";
import parser from "koa-bodyparser";
import cors from "@koa/cors";
import db from './db/database';
import * as routers from './allRouters';
import {Next} from 'koa'
import {Context, RouteInterface} from './controllerType';

const app = new Koa();
const port = 8000;

app.use(cors());
app.use(parser());

app.use(async (ctx: Context<RouteInterface>, next: Next)=>{
    try{
        ctx.status = 200;
        await next();
    } catch (error){
        console.error(error.message);
        ctx.status = error.status || 500;
        ctx.body = {
            'error': error.message,
        }
    };
})

for(const router in routers){
    app.use(routers[router].routes());
}

app.listen(port, async () => {
  try {
      await db.$connect();
  } catch (err) {
      console.error('Server starting error:', {message: err.message});
      process.exit(1);
  }
  console.info(`Server start listening (startup time: ${Date.now() - start}ms)`, {port});
});



process.on('uncaughtException', (error: Error) => {
    console.error('Uncaught Exception!', error.message);
});
