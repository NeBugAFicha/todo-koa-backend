import jwt from 'jsonwebtoken';

export default async (ctx: any, next: any) => {
    const userData = jwt.verify(ctx.request.headers.token, process.env.JWT_SECRET_KEY);
    if(!userData){
        ctx.throw(401, 'Unauthorized request')
    }
    ctx.request.user_id = userData.id;

    await next();
}