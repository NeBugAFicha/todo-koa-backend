import Joi from "joi";

export default {
    registration: {
        body: Joi.object().keys({
            'login': Joi.string().min(1).max(50).required().description('Логин пользователя'),
            'password': Joi.string().min(8).required().description('Пароль пользователя'),
        })
    },
    logIn: {
        body: Joi.object().keys({
            'login': Joi.string().min(1).max(50).required().description('Логин пользователя'),
            'password': Joi.string().min(8).required().description('Пароль пользователя'),
        }),
    },
}