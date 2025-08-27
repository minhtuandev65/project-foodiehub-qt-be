import Joi from 'joi'
import { ORGIZATION_STATUS } from '~/utils/constants'
import {
    OBJECT_ID_RULE,
    OBJECT_ID_RULE_MESSAGE,
    PHONE_RULE
} from '~/validations/validators'

export const ORGANIZATION_COLLECTION_SCHEMA = Joi.object({
    ownerId: Joi.string()
        .required()
        .pattern(OBJECT_ID_RULE)
        .message(OBJECT_ID_RULE_MESSAGE),
    name: Joi.string().required().min(3).max(100).label('Orgization name'),
    staffId: Joi.array()
        .items(
            Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
        )
        .default([])
        .label('List staff'),
    restaurantId: Joi.array.items().default([]).label('List Brach organization'),
    description: Joi.string().max(500).optional().label('Desciption'),
    logoURL: Joi.string().uri().optional().label('URL logo'),
    email: Joi.string().email().optional().label('Contact email'),
    phone: Joi.string().required().pattern(PHONE_RULE).label('Contact phone'),
    address: Joi.string().required().max(200).label('Address'),
    lat: Joi.number().required(),
    lng: Joi.number().required(),
    status: Joi.string()
        .valid(
            ORGIZATION_STATUS.ACCEPTED,
            ORGIZATION_STATUS.PENDING,
            ORGIZATION_STATUS.REJECTED
        )
        .default(ORGIZATION_STATUS.PENDING)
        .label('Status'),
    isActive: Joi.boolean().default(false),
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
