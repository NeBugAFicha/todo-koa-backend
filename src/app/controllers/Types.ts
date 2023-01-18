import { Next, BaseContext } from 'koa';
import { ObjectSchema } from 'joi';

type Request = {
  user_id: number;
  headers: {
    token: string;
  };
};

type GenericObject = {
  [key: string]: any;
};
export type RouteInterface<T = GenericObject> = {
  body?: T;
  params?: T;
  query?: T;
};

export type GenericRoute = {
  [key: string]: RouteInterface;
};
export interface Context<T extends RouteInterface> extends BaseContext {
  request: T & Request;
}

export type ControllerMethods<T> = {
  [key in keyof T]: (ctx: Context<T[key]>, next: Next) => Promise<void>;
};

export type SchemaType<T extends GenericRoute> = {
  [key in keyof T]: RouteInterface<ObjectSchema>;
};

export type RouterType<T extends GenericRoute> = {
  generalPath: string;
  routes: {
    [key in keyof T]: {
      path: string;
      method: string;
    };
  };
};
