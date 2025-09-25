// route cho việc quản lý người dùng

import express from 'express'
import { clientsController } from '~/controllers/clients'
import isAuthorized from '~/middlewares/authMiddleware'
import { managersRoute } from './managers/managersRoute'
import { usersRoute } from './users/usersRoute'
import multer from 'multer'

const Router = express.Router()
const upload = multer()

Router.route('/getMyProfile').get(isAuthorized, clientsController.getMyProfile)
Router.route('/changePassword').post(
    isAuthorized,
    clientsController.changePassword
)
Router.route('/updateMyProfile').put(
    isAuthorized,
    upload.single('imageFile'),
    clientsController.updateMyProfile
)
// USER
Router.use('/users', usersRoute)
// MANAGER
Router.use('/manager', managersRoute)
export const clientsRoute = Router
