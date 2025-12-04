import Joi from 'joi'
import { ORDERS_TABLE_STATUS } from '~/utils/constants'
import {
    OBJECT_ID_RULE,
    OBJECT_ID_RULE_MESSAGE
} from '~/validations/validators'

export const BOOK_TABLE_TIME_COLLECTION_SCHEMA = Joi.object({
    tableId: Joi.string()
        .required()
        .pattern(OBJECT_ID_RULE)
        .message(OBJECT_ID_RULE_MESSAGE),
    startTime: Joi.string().required().label('Start time'),
    endTime: Joi.string().required().label('End time'),
    status: Joi.string()
        .valid(ORDERS_TABLE_STATUS.OCCUPIED, ORDERS_TABLE_STATUS.VACANT)
        .default(ORDERS_TABLE_STATUS.VACANT)
        .label('Status'),
    createdAt: Joi.date()
        .timestamp('javascript')
        .default(Date.now)
        .label('Created day'),
    updatedAt: Joi.date()
        .timestamp('javascript')
        .allow(null)
        .default(null)
        .label('Updated day')
})
