import Joi from 'joi'
import { ORDERS_STATUS } from '~/utils/constants'
import {
    OBJECT_ID_RULE,
    OBJECT_ID_RULE_MESSAGE
} from '~/validations/validators'

export const ORDERS_COLLECTION_SCHEMA = Joi.object({
    userId: Joi.string()
        .required()
        .pattern(OBJECT_ID_RULE)
        .message(OBJECT_ID_RULE_MESSAGE),
    restaurantId: Joi.string()
        .required()
        .pattern(OBJECT_ID_RULE)
        .message(OBJECT_ID_RULE_MESSAGE),
    tableId: Joi.string()
        .required()
        .pattern(OBJECT_ID_RULE)
        .message(OBJECT_ID_RULE_MESSAGE),
    items: Joi.array()
        .min(1)
        .items(
            Joi.object({
                menuId: Joi.string()
                    .required()
                    .pattern(OBJECT_ID_RULE)
                    .message(OBJECT_ID_RULE_MESSAGE),
                quantity: Joi.number().integer().min(1).default(1),
                note: Joi.string().trim().max(200).allow(''),
                // snapshot giá để không lệ thuộc giá thay đổi sau này
                unitPrice: Joi.number().precision(2).min(0).required()
            })
        )
        .required()
        .label('Order items'),
    status: Joi.string()
        .valid(
            ORDERS_STATUS.PAID,
            ORDERS_STATUS.PENDING,
            ORDERS_STATUS.CANCELLED
        )
        .default(ORDERS_STATUS.PENDING)
        .label('Status'),
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
