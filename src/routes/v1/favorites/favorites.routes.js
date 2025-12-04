import express from 'express'
import { controller } from '~/controllers'
import isAuthorized from '~/middlewares/auth/authMiddleware'

const Router = express.Router()
Router.route('/:restaurantId').post(
    isAuthorized,
    controller.favorites.create.favorites
)
Router.route('/:restaurantId').put(
    isAuthorized,
    controller.favorites.unFavorite.unFavorite
)
export const favorites = Router
