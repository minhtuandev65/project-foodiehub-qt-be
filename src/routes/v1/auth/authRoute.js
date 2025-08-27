// route cho việc quản lý người dùng

import express from 'express'
import { authController } from '~/controllers/auth'
import isAuthorized from '~/middlewares/authMiddleware'

const Router = express.Router()

Router.route('/login').post(authController.authenticate)

Router.route('/getMyProfile').get(isAuthorized, authController.getMyProfile)

Router.route('/register').post(authController.createNewAccount)

Router.route('/logout').post(authController.logout)

Router.route('/refresh_token').get(authController.refreshToken)

Router.route('/verifyEmail').post(authController.verifyAccount)

Router.route('/forgotPassword').post(authController.forgotPassword)

Router.route('/resetPassword').post(authController.updateNewPassword)

export const authRoute = Router
