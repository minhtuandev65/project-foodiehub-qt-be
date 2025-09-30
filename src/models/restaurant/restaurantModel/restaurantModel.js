import Joi from 'joi'
import { RESTAURANT_STATUS } from '~/utils/constants'
import {
    OBJECT_ID_RULE,
    OBJECT_ID_RULE_MESSAGE,
    PHONE_RULE
} from '~/validations/validators'

export const RESTAURANT_COLLECTION_SCHEMA = Joi.object({
    staffId: Joi.array()
        .items(
            Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
        )
        .default([])
        .label('Staff IDs')
        .optional(),
    ownerId: Joi.string()
        .required()
        .pattern(OBJECT_ID_RULE)
        .message(OBJECT_ID_RULE_MESSAGE),
    name: Joi.string().required().min(3).max(100).label('Restaurant name'),
    email: Joi.string().email().optional().label('Contact email'),
    logoURL: Joi.string().uri().optional().label('URL logo'),
    phone: Joi.string().required().pattern(PHONE_RULE).label('Contact phone'),
    categories: Joi.array().items(Joi.string()).default([]).optional(),
    address: Joi.string().required().max(200).label('Address'),
    lat: Joi.number().required(),
    lng: Joi.number().required(),
    description: Joi.string().max(500).optional().label('Desciption'),
    socialLinks: Joi.array().items(Joi.string().uri()).optional(),

    openTime: Joi.string().required().label('Open time'),
    closeTime: Joi.string().required().label('Close time'),
    openDays: Joi.array()
        .items(Joi.number().min(0).max(6))
        .min(1)
        .required()
        .label('Open days'),

    totalRevenueRestaurant: Joi.number()
        .default(0)
        .label('Total revenue of restaurant'),
    totalOrders: Joi.number().default(0).label('Total orders of restaurant'),
    isOpen: Joi.boolean().default(false).label('Open status'),
    isPreOrderAvailable: Joi.boolean().default(false), //Nhà hàng có hỗ trợ tính năng đặt món trước hay không.
    preOrderNoticeTime: Joi.number().optional(), // Thời gian tối thiểu cần đặt trước (đơn vị: phút hoặc giờ).
    preOrderNote: Joi.string().max(200).optional(), //Ghi chú dành cho khách khi đặt món trước (ví dụ: “Vui lòng đặt trước ít nhất 1 tiếng”).
    tags: Joi.array().items(Joi.string()).optional(), //Từ khóa mô tả nhà hàng (VD: “gia đình”, “sang trọng”, “take-away”...).
    priceRange: Joi.string().optional(), // Khoảng giá trung bình (VD: “50.000 - 200.000đ / người”).
    ratingAverage: Joi.number().min(0).max(5).default(0), //Đánh giá trung bình
    reviewCount: Joi.number().default(0), //Tổng số đánh giá

    businessCertificateImageKey: Joi.string().optional(),
    businessCertificateFileKey: Joi.string().optional(),

    isEmployeeRecruitment: Joi.boolean().default(false), //Nhà hàng có đang tuyển dụng hay không.
    employeeRecruitmentNote: Joi.string().max(300).optional(), //Ghi chú về việc tuyển dụng (ví dụ: “Chúng tôi đang tuyển nhân viên phục vụ toàn thời gian”).
    startWorkingTime: Joi.string().optional().label('Start working time'),
    endWorkingTime: Joi.string().optional().label('End working time'),

    status: Joi.string()
        .valid(
            RESTAURANT_STATUS.ACCEPT,
            RESTAURANT_STATUS.PENDING,
            RESTAURANT_STATUS.REJECT
        )
        .default(RESTAURANT_STATUS.PENDING)
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
