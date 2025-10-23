import express from 'express'
import { admin } from './admin/admin.user.routes'
import isAuthorized from '~/middlewares/auth/authMiddleware'
import { controller } from '~/controllers'
import { middlewares } from '~/middlewares'

const Router = express.Router()

Router.route('/profile').get(isAuthorized, controller.user.data.getMyProfile)
Router.route('/profile').put(
    isAuthorized,
    middlewares.aws.upload.uploadAvatar,
    controller.user.update.profileUser
)
Router.route('/password').patch(
    isAuthorized,
    controller.user.update.changeNewPassword
)
Router.use('/admin', admin)
export const user = Router
