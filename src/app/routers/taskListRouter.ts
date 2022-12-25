import koaRouter from 'koa-router';
import taskList from '../controllers/taskList';
import taskListSchema from '../schemas/taskListSchema';
import validator from '../middlewares/validator';
import checkAuth from '../middlewares/checkAuth';

const router = new koaRouter();


router.get('/task_list', checkAuth, validator(taskListSchema.findAll), taskList.findAll);
router.get('/task_list/:id', checkAuth, validator(taskListSchema.findById), taskList.findById);
router.post('/task_list',  checkAuth, validator(taskListSchema.create), taskList.create);
router.delete('/task_list/:id', checkAuth, validator(taskListSchema.delete), taskList.delete);
router.delete('/task_list/list/:list_id', checkAuth, validator(taskListSchema.findAllByList), taskList.findAllByList);

export default router;