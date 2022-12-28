import {Next, BaseContext} from 'koa'

export interface RouteInterface<T = any> {
    body?: T;
    params?: T;
    query?: T;
    user_id?: number;
    headers?: {
        token: string;
    }
}

export interface Context<T extends RouteInterface> extends BaseContext{
    request: T;
}

export type ControllerMethods<T> = {
    [key in keyof T]: (
        ctx: Context<T[key]>,
        next: Next
    ) => Promise<void>;
}
