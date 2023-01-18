import { RouterType } from '../Types';
import { Type } from './type';

export const Router: RouterType<Type> = {
  generalPath: '/task_list',
  routes: {
    findAll: {
      method: 'get',
      path: '',
    },
    findById: {
      method: 'get',
      path: '/:id',
    },
    create: {
      method: 'post',
      path: '',
    },
    delete: {
      method: 'delete',
      path: '/:id',
    },
    findAllByList: {
      method: 'get',
      path: '/list',
    },
  },
};
