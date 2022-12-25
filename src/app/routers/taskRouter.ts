import koaRouter from 'koa-router';
import task from '../controllers/task';
import checkAuth from '../middlewares/checkAuth';

const router = new koaRouter();

router.get('/task_list/:task_list_id/task/:id', checkAuth, task.findById);
router.post('/task_list/:task_list_id/task', checkAuth, task.create);
router.delete('/task_list/:task_list_id/task/:id', checkAuth, task.delete);
router.put('/task_list/:task_list_id/task/:id', checkAuth, task.update);

export default router;