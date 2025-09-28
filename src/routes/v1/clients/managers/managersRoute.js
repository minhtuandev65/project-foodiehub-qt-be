import express from 'express'
import { clientsController } from '~/controllers/clients'
import isAuthorized, { hasRole } from '~/middlewares/authMiddleware'
import { ROLE } from '~/utils/constants'
import { organizationRoute } from './organization/organizationRoute'
const Router = express.Router()

Router.get(
    '/getCvUser/:userId',
    isAuthorized,
    hasRole(ROLE.MANAGER),
    clientsController.getCvUser
)

Router.use('/organization', organizationRoute)
export const managersRoute = Router
