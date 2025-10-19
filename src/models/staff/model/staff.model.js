import Joi from 'joi'
import { env } from '~/config/env/environment'
import { GENDER, ROLE } from '~/utils/constants'
import {
    EMAIL_RULE,
    EMAIL_RULE_MESSAGE,
    OBJECT_ID_RULE,
    OBJECT_ID_RULE_MESSAGE,
    PHONE_RULE
} from '~/validations/validators'

export const STAFF_COLLECTION_SCHEMA = Joi.object({
    restaurantId: Joi.string()
        .required()
        .pattern(OBJECT_ID_RULE)
        .message(OBJECT_ID_RULE_MESSAGE),
    staffId: Joi.string()
        .required()
        .pattern(OBJECT_ID_RULE)
        .message(OBJECT_ID_RULE_MESSAGE),
    email: Joi.string()
        .required()
        .pattern(EMAIL_RULE)
        .message(EMAIL_RULE_MESSAGE),
    role: Joi.string()
        .valid(...Object.values(ROLE))
        .default(ROLE.STAFF),
    phone: Joi.string().pattern(PHONE_RULE).label('Contact Phone'),
    avatar: Joi.string().default(env.DEFAULT_AVATAR),
    gender: Joi.string()
        .valid(...Object.values(GENDER))
        .default(GENDER.MALE),
    workStartTime: Joi.string().required().label('Work start time'),
    workEndTime: Joi.string().required().label('Work end time'),
    workDays: Joi.array()
        .items(Joi.number().min(0).max(6))
        .min(1)
        .required()
        .label('Work days'),
    isActive: Joi.boolean().default(false),
    createdAt: Joi.date().timestamp('javascript').default(Date.now),
    updatedAt: Joi.date().timestamp('javascript').allow(null).default(null),
    _destroy: Joi.boolean().default(false)
})
