const start = Date.now();
import Koa from "koa";
import parser from "koa-bodyparser";
import cors from "@koa/cors";
import db from './db/database';
import InOut  from './middlewares/InOut';
import notFound from './middlewares/notFound';
import { Routers } from './Routers';
import * as controllers from './controllers/index';

const app = new Koa();
const port = process.env.PORT || 8000;
const {routers} = new Routers(controllers);

app.use(cors());
app.use(parser());

app.use(InOut);

for(const router of routers){
    app.use(router.routes());
}

app.use(notFound);

app.listen(port, async () => {
  try {
      await db.$connect();
      await db.$disconnect();
  } catch (err) {
      console.error('Server starting error:', {message: err.message});
      process.exit(1);
  }
  console.info(`Server start listening (startup time: ${Date.now() - start}ms)`, {port});
});

process.on('uncaughtException', (error: Error) => {
    console.error('Uncaught Exception!', error.message);
});
