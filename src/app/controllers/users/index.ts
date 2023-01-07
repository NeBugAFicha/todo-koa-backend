import db from '../../db/database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ControllerMethods } from '../Types';
import { Type } from './type';
import { Router } from './router';
import { Schema } from './schema';

type Methods = ControllerMethods<Type>;
class User implements Methods{
    readonly router = Router;
    readonly schema = Schema;
    registration: Methods['registration'] = async (ctx)=>{   
        let {login, password} = ctx.request.body;
        password = await bcrypt.hash(password,3);

        const result = await db.users.create({
            data: {login, password}, 
        });

        ctx.body = { data: {token: jwt.sign(result, process.env.JWT_SECRET_KEY)} };
    };

    logIn: Methods['logIn'] = async (ctx) => {
        let {login, password} = ctx.request.body;
        const result = await db.users.findFirst({
            where: {login},
        })

        const isPassEquals = await bcrypt.compare(password,result.password);
        if(!isPassEquals){
            ctx.throw(403, 'Incorrect password')
        }
        const token = jwt.sign(result, process.env.JWT_SECRET_KEY);

        ctx.body = { data: { message: 'Valid credentials', token } };
    }
};

export const user = new User();