import Joi from 'joi'
import {
    OBJECT_ID_RULE,
    OBJECT_ID_RULE_MESSAGE
} from '~/validations/validators'

export const TABLE_COLLECTION_SCHEMA = Joi.object({
    creatorId: Joi.string()
        .required()
        .pattern(OBJECT_ID_RULE)
        .message(OBJECT_ID_RULE_MESSAGE),
    restaurantId: Joi.string()
        .required()
        .pattern(OBJECT_ID_RULE)
        .message(OBJECT_ID_RULE_MESSAGE),
    name: Joi.string()
        .required()
        .min(3)
        .max(100)
        .label('table name'),
    imageURL: Joi.string().uri().required().label('URL image table'),

    categories: Joi.number().required(),

    status: Joi.number().required().label("1: còn trống, 2: đã được đặt"),

    description: Joi.string()
        .max(500)
        .optional()
        .label('Desciption for table'),

    capacity: Joi.string()
        .max(500)
        .optional()
        .label('Sức chứa của bàn'),

    lastUpdateUserId: Joi.string()
        .pattern(OBJECT_ID_RULE)
        .message(OBJECT_ID_RULE_MESSAGE),
    
    createdAt: Joi.date()
        .timestamp('javascript')
        .default(Date.now)
        .label('Created day'),
    updatedAt: Joi.date()
        .timestamp('javascript')
        .allow(null)
        .default(null)
        .label('Updated day'),
    _destroy: Joi.boolean().default(false).label('Destroy')
})
