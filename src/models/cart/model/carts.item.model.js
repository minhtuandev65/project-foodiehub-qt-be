import Joi from 'joi'
import {
    OBJECT_ID_RULE,
    OBJECT_ID_RULE_MESSAGE
} from '~/validations/validators'

export const CART_ITEMS_COLLECTION_SCHEMA = Joi.object({
    cartId: Joi.string()
        .required()
        .pattern(OBJECT_ID_RULE)
        .message(OBJECT_ID_RULE_MESSAGE),
    menuId: Joi.string()
        .required()
        .pattern(OBJECT_ID_RULE)
        .message(OBJECT_ID_RULE_MESSAGE),
    name: Joi.string()
        .required()
        .min(3)
        .max(100)
        .label('dish name or drink name'),
    imageURL: Joi.string().uri().required().label('URL image dish or drink'),
    price: Joi.number().required().default(0).label('Price for dish or drink'),
    quantity: Joi.number().integer().min(1).required().label('Quantity'),
    notes: Joi.string().allow('').max(500).label('Notes'),
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
