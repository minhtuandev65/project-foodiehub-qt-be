import express from 'express'
import isAuthorized, { hasAnyRole } from '~/middlewares/auth/authMiddleware'
import { controller } from '~/controllers'
import { ROLE } from '~/utils/constants'

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
Router.route('/:bookTableId').get(
    isAuthorized,
    hasAnyRole(ROLE.STAFF, ROLE.MANAGER),
    controller.cart.cartItems.staff.data.list
)
Router.route('/:cartId').patch(
    isAuthorized,
    hasAnyRole(ROLE.STAFF, ROLE.MANAGER),
    controller.cart.cartItems.staff.update.status
)
export const staff = Router
