import Joi from 'joi'
import {
    OBJECT_ID_RULE,
    OBJECT_ID_RULE_MESSAGE
} from '~/validations/validators'

export const MENU_COLLECTION_SCHEMA = Joi.object({
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
        .label('dish name or drink name'),
    imageURL: Joi.string().uri().required().label('URL image dish or drink'),

    categories: Joi.string().valid('dish', 'drink', 'dessert').required(),
    price: Joi.number().required().default(0).label('Price for dish or drink'),
    description: Joi.string()
        .max(500)
        .optional()
        .label('Desciption for dish name or drink name'),

    quantity: Joi.number()
        .default(0)
        .min(0)
        .required()
        .label('Quantity dish or drink'),

    totalOrders: Joi.number().default(0).label('Total orders of dish or drink'),

    ratingAverage: Joi.number()
        .min(0)
        .max(5)
        .default(0)
        .label('Rate Average for dish or drink'), //Đánh giá trung bình
    reviewCount: Joi.number().default(0), //Tổng số đánh giá

    isAvailable: Joi.boolean().default(false), // còn món hay không
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
