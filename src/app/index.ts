const start = Date.now();
import Koa from "koa";
import parser from "koa-bodyparser";
import cors from "@koa/cors";
import db from './db/database';
import taskListRouter from './routers/taskListRouter';
import taskRouter from './routers/taskRouter';
import userRouter from "./routers/userRouter";

const app = new Koa();
const port = 8000;

app.use(cors());
app.use(parser());

app.use(async (ctx: any, next)=>{
    try{
        ctx.status = 200;
        await next();
    } catch (error){
        console.log(error);
        ctx.status = error.status || 500;
        ctx.body = {
            'error': error.message,
        }
    };
})
app.use(userRouter.routes());
app.use(taskListRouter.routes());
app.use(taskRouter.routes());


app.listen(port, async (error: any) => {
  try {
      if (error) {
          throw error;
      }
      await db.$connect();
  } catch (err) {
      console.error('Server starting error:', {message: err.message});
      process.exit(1);
  }
  console.info(`Server start listening (startup time: ${Date.now() - start}ms)`, {port});
});
