/**
 *
 *
 *
 * "Nơi lưu trữ các trạng thái, hằng số, biến toàn cục dùng chung trong ứng dụng"
 */

import { env } from '~/config/environment'

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
    ACCEPT: 1,
    PENDING: 2,
    REJECT: 2
}
export const CANDIDATE_PROFILE_STATUS = {
    ACCEPT: 1,
    PENDING: 2,
    REJECT: 3
}
