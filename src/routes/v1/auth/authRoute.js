import express from 'express'
import { authController } from '~/controllers/auth'

const Router = express.Router()

Router.route('/login').post(authController.authenticate)

Router.route('/register').post(authController.createNewAccount)

Router.route('/logout').post(authController.logout)

Router.route('/refreshToken').get(authController.refreshToken)

Router.route('/verifyEmail').post(authController.verifyAccount)

Router.route('/forgotPassword').post(authController.forgotPassword)

Router.route('/resetPassword').post(authController.resetNewPassword)

export const authRoute = Router
