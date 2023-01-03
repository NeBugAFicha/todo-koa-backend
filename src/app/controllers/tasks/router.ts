import { RouterType } from '../Types';
import {Type} from './type';

export const Router: RouterType<Type> = {
  generalPath: '/task_list/:task_list_id',
  routes: {
    findById: {
        method: 'get',
        path: '/task/:id'
    },
    create: {
        method: 'post',
        path: '/task'
    },
    delete: {
        method: 'delete',
        path: '/task/:id'
    },
    update: {
        method: 'put',
        path: '/task/:id'
    }
  }
}