export default (schema: any) => {
    return async (ctx: any, next: any) => {
        for(const part in schema){
            const validation = schema[part].validate(ctx.request[part])
            if(validation.error){
                ctx.throw(400, JSON.stringify({name: 'Validation Error', details: validation.error.details}));
            }
        }
        await next();
    }
}