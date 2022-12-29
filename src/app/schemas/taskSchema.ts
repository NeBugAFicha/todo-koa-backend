import Joi from "joi";

export default {
    create: {
        params: Joi.object().keys({
            'task_list_id': Joi.number().positive().required(),
        }),
        body: Joi.object().keys({
            'name': Joi.string().min(1).max(50).required().description('Название задачи'),
        })
    },
    findById: {
        params: Joi.object().keys({
            'task_list_id': Joi.number().positive().required(),
            'id': Joi.number().positive().required(),
        }),
    },
    delete: {
        params: Joi.object().keys({
            'task_list_id': Joi.number().positive().required(),
            'id': Joi.number().positive().required(),
        }),
    },
    update: {
        params: Joi.object().keys({
            'task_list_id': Joi.number().positive().required(),
            'id': Joi.number().positive().required(),
        }),
        body: Joi.object().keys({
            'name': Joi.string().min(1).max(50).required().description('Название задачи'),
        })
    },
}