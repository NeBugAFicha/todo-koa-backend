import Joi from 'joi';
import { SchemaType } from '../Types';
import {Type} from './type';

export const Schema: SchemaType<Type> = {
    grant: {
        params: Joi.object().keys({
            'task_list_id': Joi.number().positive().required(),
        }),
        query: Joi.object().keys({
            'grant': Joi.string().valid('Create', 'Read', 'Update', 'Delete').insensitive().required().description('Тип права'),
            'user_id': Joi.number().positive().required().description('Идентификатор пользователя'),
            'take_off': Joi.boolean().description('Отнять права'),
        })
    },
}