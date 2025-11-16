import express from 'express'
import { controller } from '~/controllers'
import isAuthorized from '~/middlewares/auth/authMiddleware'

const Router = express.Router()
Router.route('/:restaurantId').post(
    isAuthorized,
    controller.favorites.create.favorites
)

export const favorites = Router
