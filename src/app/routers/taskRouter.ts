import koaRouter from 'koa-router';
import task from '../controllers/task';
import taskSchema from '../schemas/taskSchema';
import validator from '../middlewares/validator';
import checkAuth from '../middlewares/checkAuth';

const router = new koaRouter();

router.get('/task_list/:task_list_id/task/:id', checkAuth, validator(taskSchema.findById), task.findById);
router.post('/task_list/:task_list_id/task', checkAuth, validator(taskSchema.create), task.create);
router.delete('/task_list/:task_list_id/task/:id', checkAuth, validator(taskSchema.delete), task.delete);
router.put('/task_list/:task_list_id/task/:id', checkAuth, validator(taskSchema.update), task.update);

export default router;