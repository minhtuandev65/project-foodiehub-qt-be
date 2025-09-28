/**project-dinespot*/
import express from 'express'
import { authRoute } from './auth/authRoute'
import { clientsRoute } from './clients/clientsRoute'
import { adminRoute } from './admin/adminRoute'

const Router = express.Router()

Router.get('/health', (req, res) => {
    res.json({
        message: 'Ready to use.'
    })
})

Router.use('/api/admin', adminRoute)
Router.use('/api/auth', authRoute)
Router.use('/api/clients', clientsRoute)


export const APIs_v1 = Router
