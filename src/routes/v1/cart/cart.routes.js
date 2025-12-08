import express from 'express'
import isAuthorized from '~/middlewares/auth/authMiddleware'
import { controller } from '~/controllers'

const Router = express.Router()

Router.route('/:restaurantId').post(
    isAuthorized,
    controller.cart.cartItems.create.cartItems
)
Router.route('/:cartItemsId/increase').patch(
    isAuthorized,
    controller.cart.cartItems.update.increaseQuantity
)
Router.route('/:cartItemsId/decrease').patch(
    isAuthorized,
    controller.cart.cartItems.update.decreaseQuantity
)
Router.route('/:cartItemsId').delete(
    isAuthorized,
    controller.cart.cartItems.deleting.cartItem
)
Router.route('/:restaurantId').get(
    isAuthorized,
    controller.cart.cartItems.data.list
)
export const cart = Router
