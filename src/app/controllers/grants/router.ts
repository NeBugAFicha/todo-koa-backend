import { RouterType } from '../Types';
import {Type} from './type';

export const Router: RouterType<Type> = {
  generalPath: '/task_list/:task_list_id',
  routes: {
    grant: {
        method: 'get',
        path: '/grant'
    },
  }
}