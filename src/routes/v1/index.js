/**project-dinespot*/
import express from 'express'
import { auth } from './auth/auth.routes'
import { admin } from './admin/admin.routes'
import { restaurant } from './restaurant/restaurant.routes'
import { user } from './user/user.routes'
import { menu } from './menu/menu.routes'
import { table } from './table/table.routes'
import { order } from './order/order.routes'
import { bookTable } from './bookTable/book.table.routes'
import { cart } from './cart/cart.routes'
import { favorites } from './favorites/favorites.routes'

const Router = express.Router()

Router.get('/health', (req, res) => {
    res.json({
        message: 'Ready to use.'
    })
})

Router.use('/api/admin', admin)
Router.use('/api/auth', auth)
Router.use('/api/restaurant', restaurant)
Router.use('/api/user', user)
Router.use('/api/menu', menu)
Router.use('/api/table', table)
Router.use('/api/order', order)
Router.use('/api/book-table', bookTable)
Router.use('/api/cart-items', cart)
Router.use('/api/favorites', favorites)
export const APIs_v1 = Router
