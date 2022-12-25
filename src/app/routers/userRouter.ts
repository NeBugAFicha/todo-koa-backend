import koaRouter from 'koa-router';
import user from '../controllers/user';
import userSchema from '../schemas/userSchema';
import validator from '../middlewares/validator';

const router = new koaRouter();

router.post('/registration', validator(userSchema.registration), user.registration);
router.post('/login', validator(userSchema.logIn), user.logIn);

export default router;