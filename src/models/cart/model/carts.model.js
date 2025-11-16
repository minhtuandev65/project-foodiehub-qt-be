import Joi from 'joi'
import {
    OBJECT_ID_RULE,
    OBJECT_ID_RULE_MESSAGE
} from '~/validations/validators'

export const CARTS_COLLECTION_SCHEMA = Joi.object({
    userId: Joi.string()
        .required()
        .pattern(OBJECT_ID_RULE)
        .message(OBJECT_ID_RULE_MESSAGE),
    bookTableId: Joi.string()
        .required()
        .pattern(OBJECT_ID_RULE)
        .message(OBJECT_ID_RULE_MESSAGE),
    createdAt: Joi.date()
        .timestamp('javascript')
        .default(Date.now)
        .label('Created day')
})
