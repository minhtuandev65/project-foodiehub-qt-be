import express from 'express'
import { user } from './user/user.restaurant.routes'
import { manager } from './manager/manager.restaurant.routes'
import { admin } from './admin/admin.restaurant.routes'
import { staff } from './staff/staff.restaurant.routes'

const Router = express.Router()

// route admin
Router.use('/admin', admin)
// route manager
Router.use('/manager', manager)
// route user
Router.use('/user', user)
// route staff
Router.use('/staff', staff)
export const restaurant = Router
