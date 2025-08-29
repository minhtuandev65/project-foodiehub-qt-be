// route cho việc quản lý người dùng

import express from 'express'
import { clientsController } from '~/controllers/clients'

import isAuthorized from '~/middlewares/authMiddleware'

const Router = express.Router()

Router.route('/getMyProfile').get(isAuthorized, clientsController.getMyProfile)
Router.route('/changePassword').post(
    isAuthorized,
    clientsController.changePassword
)

export const clientsRoute = Router
