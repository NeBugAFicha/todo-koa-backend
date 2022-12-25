import {Next, Request, Context} from '@types/koa'

interface GenericObject<Values = any> {
    [key: string]: Values;
}
interface ExtendedRequest<
    ReqBody = GenericObject,
    ReqParams = GenericObject,
    ReqQuery = GenericObject
> extends Request {};


interface RouteInterface<T = any> {
    body?: T;
    params?: T;
    query?: T;
}

type RouteExtendedRequest<RI extends RouteInterface> = ExtendedRequest<RI['body'], RI['params'], RI['query']>;

interface RouteExtendedContext<T> extends Context{
    request: RouteExtendedRequest<T>
};
export type ControllerMethods<T> = {
    [key in keyof T]: (
        ctx: RouteExtendedContext<T[key]>,
        next: Next
    ) => Promise<void>;
}