import Joi from 'joi'
import { env } from '~/config/environment'
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
    staffEmail: Joi.array()
        .items(Joi.string().email().label('Staff email'))
        .default([])
        .label('List staff'),
    restaurantId: Joi.array()
        .items()
        .default([])
        .label('List Brach organization'),
    description: Joi.string()
        .required()
        .max(500)
        .optional()
        .label('Desciption'),
    logoURL: Joi.string()
        .uri()
        .optional()
        .label('URL logo')
        .default(env.DEFAULT_LOGO_ORGANIZATION),
    email: Joi.string().required().email().optional().label('Contact email'),
    phone: Joi.string().required().pattern(PHONE_RULE).label('Contact phone'),
    address: Joi.string().required().max(200).label('Address'),
    lat: Joi.number().required(),
    lng: Joi.number().required(),
    businessCertificateImageKey: Joi.string().optional(),
    businessCertificateFileKey: Joi.string().optional(),
    
    totalRevenueOrganization: Joi.number().default(0).label('Total amout'),
    isActive: Joi.boolean().default(false),
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
