import Joi from 'joi'
import { CANDIDATE_PROFILE_STATUS, GENDER } from '~/utils/constants'
import {
    OBJECT_ID_RULE,
    OBJECT_ID_RULE_MESSAGE
} from '~/validations/validators'

export const CANDIDATE_PROFILE_COLLECTION_SCHEMA = Joi.object({
    userId: Joi.string()
        .required()
        .pattern(OBJECT_ID_RULE)
        .message(OBJECT_ID_RULE_MESSAGE),
    restaurantId: Joi.string()
        .required()
        .pattern(OBJECT_ID_RULE)
        .message(OBJECT_ID_RULE_MESSAGE),
    email: Joi.string().required().email().label('Contact email'),
    firstName: Joi.string().required().trim().strict(),
    lastName: Joi.string().required().trim().strict(),
    fullName: Joi.string().trim().strict().label('Full name'),
    gender: Joi.string()
        .required()
        .valid(...Object.values(GENDER)),
    age: Joi.number().min(18).max(100).optional().label('Age'),
    phone: Joi.string().label('Contact phone'),
    address: Joi.string().max(200).optional().label('Address'),

    skills: Joi.array().items(Joi.string().trim().strict()).label('Skills'),
    experience: Joi.string().max(1000).optional().label('Experience'),
    education: Joi.string().max(1000).optional().label('Education'),
    candidatePosition: Joi.string()
        .max(100)
        .optional()
        .label('Candidate position'),

    status: Joi.string()
        .valid(
            CANDIDATE_PROFILE_STATUS.ACCEPT,
            CANDIDATE_PROFILE_STATUS.PENDING,
            CANDIDATE_PROFILE_STATUS.REJECT
        )
        .default(CANDIDATE_PROFILE_STATUS.PENDING)
        .label('Status'),
    cvKeyS3: Joi.string().optional().allow(null).label('CV file S3 key'),
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
