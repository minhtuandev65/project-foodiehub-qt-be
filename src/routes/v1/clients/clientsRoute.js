// route cho việc quản lý người dùng

import express from 'express'
import { clientsController } from '~/controllers/clients'
import isAuthorized from '~/middlewares/authMiddleware'
import { managersRoute } from './managers/managersRoute'
import { usersRoute } from './users/usersRoute'

const Router = express.Router()

Router.route('/getMyProfile').get(isAuthorized, clientsController.getMyProfile)
Router.route('/changePassword').post(
    isAuthorized,
    clientsController.changePassword
)
// USER
Router.use('/users', usersRoute)
// MANAGER
Router.use('/manager', managersRoute)
export const clientsRoute = Router
