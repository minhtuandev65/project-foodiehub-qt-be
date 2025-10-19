import express from 'express'
import { admin } from './admin/admin.user.routes'


const Router = express.Router()

Router.use('/admin', admin)
export const user = Router
