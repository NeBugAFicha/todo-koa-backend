import KoaRouter from 'koa-router';
import checkAuth from './middlewares/checkAuth';
import validator from './middlewares/validator';

export class Routers {
  controllers = {};
  routers: KoaRouter[] = [];

  constructor(controllers) {
    this.controllers = controllers;
    this.init();
  }
  init() {
    for (const controllerKey in this.controllers) {
      const router = new KoaRouter();
      const controller = this.controllers[controllerKey];
      const {
        router: { generalPath, routes },
        schema,
      } = controller;
      for (const handler in routes) {
        const { method, path } = routes[handler];
        if (['registration', 'logIn'].includes(handler)) {
          router[method](generalPath + path, validator(schema[handler]), controller[handler]);
        } else {
          router[method](generalPath + path, checkAuth, validator(schema[handler]), controller[handler]);
        }
      }
      this.routers.push(router);
    }
  }
}
