import {Next, BaseContext} from 'koa'
import {ObjectSchema} from 'joi'


type Request = {
    user_id: number;
    headers: {
        token: string;
    }
}

type GenericObject = {
    [key: string]: any
}
export interface RouteInterface{
    body?: GenericObject;
    params?: GenericObject;
    query?: GenericObject;
}

export interface Context<T extends RouteInterface> extends BaseContext{
    request: T & Request;
}

export type ControllerMethods<T> = {
    [key in keyof T]: (
        ctx: Context<T[key]>,
        next: Next
    ) => Promise<void>;
}

export type SchemaType<T> = {
    [key in keyof T]: {
        [key2 in keyof T[key]]: ObjectSchema
    };
};

export type RouterType<T> = {
    generalPath: string, 
    routes: {
        [key in keyof T]: {
            path: string,
            method: string,
        }
    }
}
