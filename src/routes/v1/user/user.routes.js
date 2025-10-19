import express from 'express'
import { admin } from './admin/admin.user.routes'
import isAuthorized from '~/middlewares/authMiddleware'
import { controller } from '~/controllers'


const Router = express.Router()
Router.route('/getMyProfile').get(isAuthorized, controller.user.data.getMyProfile)
Router.route('/updateMyProfile').put(isAuthorized, controller.user.update.profileUser)
Router.use('/admin', admin)
export const user = Router
