import Joi from 'joi'
import {
    OBJECT_ID_RULE,
    OBJECT_ID_RULE_MESSAGE,
    PHONE_RULE
} from '~/validations/validators'

export const RESTAURANT_COLLECTION_SCHEMA = Joi.object({
    organizationId: Joi.string()
        .required()
        .pattern(OBJECT_ID_RULE)
        .message(OBJECT_ID_RULE_MESSAGE),
    revenueId: Joi.string()
        .required()
        .pattern(OBJECT_ID_RULE)
        .message(OBJECT_ID_RULE_MESSAGE)
        .default(0),
    openTime: Joi.string().required().label('Open time'),
    closeTime: Joi.string().required().label('Close time'),
    name: Joi.string().required().min(3).max(100).label('Restaurant name'),
    email: Joi.string().email().optional().label('Contact email'),
    logoURL: Joi.string().uri().optional().label('URL logo'),
    phone: Joi.string().required().pattern(PHONE_RULE).label('Contact phone'),
    categories: Joi.array()
        .items(Joi.string())
        .optional()
        .label('Category dish'),
    address: Joi.string().required().max(200).label('Address'),
    description: Joi.string().max(500).optional().label('Desciption'),
    totalAmoutRestaurant: Joi,
    lat: Joi.number().required(),
    lng: Joi.number().required(),
    createdAt: Joi.date()
        .timestamp('javascript')
        .default(Date.now)
        .label('Created day'),
    updatedAt: Joi.date()
        .timestamp('javascript')
        .default(null)
        .label('Updated day'),
    _destroy: Joi.boolean().default(false).label('Destroy')
})
