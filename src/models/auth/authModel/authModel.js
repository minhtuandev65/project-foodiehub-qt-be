import Joi from 'joi'
import { env } from '~/config/environment'
import { GENDER, ROLE } from '~/utils/constants'
import {
    EMAIL_RULE,
    EMAIL_RULE_MESSAGE,
    PHONE_RULE
} from '~/validations/validators'

export const USER_COLLECTION_SCHEMA = Joi.object({
    email: Joi.string()
        .required()
        .pattern(EMAIL_RULE)
        .message(EMAIL_RULE_MESSAGE),
    password: Joi.string().required(),
    // username cắt ra từ email sẽ có khả năng không unique bởi vì sẽ có những tên email trùng nhau nhưng từ các nhà cung cấp khác nhau
    username: Joi.string().required().trim().strict(),
    fullName: Joi.string().trim().strict(),
    firstName: Joi.string().required().trim().strict(),
    lastName: Joi.string().required().trim().strict(),
    role: Joi.string()
        .valid(...Object.values(ROLE))
        .default(ROLE.USER),
    phone: Joi.string().pattern(PHONE_RULE).label('Contact Phone'),
    avatar: Joi.string().default(env.DEFAULT_AVATAR),
    gender: Joi.string()
        .valid(...Object.values(GENDER))
        .default(GENDER.MALE),
    isActive: Joi.boolean().default(false),
    verifyToken: Joi.string(),
    createdAt: Joi.date().timestamp('javascript').default(Date.now),
    updatedAt: Joi.date().timestamp('javascript').default(null),
    latestActiveAt: Joi.date().timestamp('javascript').default(null),
    _destroy: Joi.boolean().default(false)
})
