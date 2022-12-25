import koaRouter from 'koa-router';
import grant from '../controllers/grant';
import grantSchema from '../schemas/grantSchema';
import validator from '../middlewares/validator';
import checkAuth from '../middlewares/checkAuth';

const router = new koaRouter();

router.get('/task_list/:task_list_id/create_grant', checkAuth, validator(grantSchema.createGrant), grant.createGrant);
router.get('/task_list/:task_list_id/read_grant', checkAuth, validator(grantSchema.readGrant), grant.readGrant);
router.get('/task_list/:task_list_id/update_grant',  checkAuth, validator(grantSchema.updateGrant), grant.updateGrant);
router.get('/task_list/:task_list_id/delete_grant', checkAuth, validator(grantSchema.deleteGrant), grant.deleteGrant);

export default router;