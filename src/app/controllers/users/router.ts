import { RouterType } from '../Types';
import { Type } from './type';

export const Router: RouterType<Type> = {
  generalPath: '',
  routes: {
    registration: {
      method: 'post',
      path: '/registration',
    },
    logIn: {
      method: 'post',
      path: '/login',
    },
  },
};
