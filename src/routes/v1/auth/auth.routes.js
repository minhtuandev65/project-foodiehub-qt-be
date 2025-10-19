import express from 'express'
import { controller } from '~/controllers'

const Router = express.Router()

Router.route('/login').post(controller.auth.authenticate)

Router.route('/register').post(controller.auth.createNewAccount)

Router.route('/logout').post(controller.auth.logout)

Router.route('/refreshToken').get(controller.auth.refreshToken)

Router.route('/verifyEmail').patch(controller.auth.verifyAccount)

Router.route('/forgotPassword').patch(controller.auth.forgotPassword)

Router.route('/resetPassword').patch(controller.auth.resetNewPassword)

export const auth = Router
