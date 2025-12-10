/**
 *
 *
 *
 * "Nơi lưu trữ các trạng thái, hằng số, biến toàn cục dùng chung trong ứng dụng"
 */

import { env } from '~/config/env/environment'

export const WEBSITE_DOMAIN =
    env.BUILD_MODE === 'production'
        ? env.WEBSITE_DOMAIN_PRODUCTION
        : env.WEBSITE_DOMAIN_DEVELOPMENT
export const APP_LOGO =
    'https://project-foodiehub-qt.s3.us-east-1.amazonaws.com/logo-banner-web/logo.png'
export const ROLE = {
    ADMIN: 1,
    MANAGER: 2,
    STAFF: 3,
    USER: 4
}
export const GENDER = {
    MALE: 1,
    FEMALE: 2
}
export const RESTAURANT_STATUS = {
    APPROVED: 1,
    PENDING: 2,
    REJECT: 3
}
export const ORDERS_STATUS = {
    PAID: 1,
    PENDING: 2,
    CANCELLED: 3
}
export const TABLE_CATEGORY = {
    NORMAL: 1,
    VIP: 2
}
export const ORDERS_TABLE_STATUS = {
    OCCUPIED: 1, // Đã có khách ngồi
    VACANT: 2 // Chưa có khách ngồi
}
export const CART_ITEM_STATUS = {
    DONE: 1,
    NOT_ORDERED: 3,
    PENDING: 2
}
