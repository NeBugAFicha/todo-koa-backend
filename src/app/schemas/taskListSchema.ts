import Joi from 'joi';

export default {
    create: {
        body: Joi.object().keys({
            'name': Joi.string().min(1).max(50).required().description('Название списка задач'),
        })
    },
    findById: {
        params: Joi.object().keys({
            'id': Joi.number().positive().required(),
        }),
    },
    findAll: {
        query: Joi.object().keys({
            'my_list': Joi.boolean().required().description('Флаг принадлежности списков задач'),
        })
    },
    delete: {
        params: Joi.object().keys({
            'id': Joi.number().positive().required(),
        }),
    },
    findAllByList: {
        params: Joi.object().keys({
            'list_id': Joi.number().positive().required().description('Идентификтор листа списков задач'),
        }),
    },
}