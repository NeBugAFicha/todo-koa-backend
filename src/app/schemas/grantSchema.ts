import Joi from 'joi';

export default {
    createGrant: {
        params: Joi.object().keys({
            'task_list_id': Joi.number().positive().required(),
        }),
        query: Joi.object().keys({
            'user_id': Joi.string().min(1).max(50).required().description('Идентификатор пользователя'),
        })
    },
    readGrant: {
        params: Joi.object().keys({
            'task_list_id': Joi.number().positive().required(),
        }),
        query: Joi.object().keys({
            'user_id': Joi.string().min(1).max(50).required().description('Идентификатор пользователя'),
        })
    },
    updateGrant: {
        params: Joi.object().keys({
            'task_list_id': Joi.number().positive().required(),
        }),
        query: Joi.object().keys({
            'user_id': Joi.string().min(1).max(50).required().description('Идентификатор пользователя'),
        })
    },
    deleteGrant: {
        params: Joi.object().keys({
            'task_list_id': Joi.number().positive().required(),
        }),
        query: Joi.object().keys({
            'user_id': Joi.string().min(1).max(50).required().description('Идентификатор пользователя'),
        })
    },
}