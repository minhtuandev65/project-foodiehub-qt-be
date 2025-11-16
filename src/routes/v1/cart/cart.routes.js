import express from 'express'
import isAuthorized from '~/middlewares/auth/authMiddleware'
import { controller } from '~/controllers'

const Router = express.Router()

Router.route('/:restaurantId').post(
    isAuthorized,
    controller.cart.cartItems.create.cartItems
)
export const cart = Router
