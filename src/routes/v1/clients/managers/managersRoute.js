import express from 'express'
import { clientsController } from '~/controllers/clients'
import isAuthorized, { hasRole } from '~/middlewares/authMiddleware'
import { ROLE } from '~/utils/constants'
import { restaurantRoute } from './restaurant/restaurantRoute'
const Router = express.Router()

Router.get(
    '/getCvUser/:userId',
    isAuthorized,
    hasRole(ROLE.MANAGER),
    clientsController.getCvUser
)
Router.get(
    '/getCandidateProfile/:organizationId',
    isAuthorized,
    hasRole(ROLE.MANAGER),
    clientsController.getCandidateProfile
)
Router.use('/restaurant', restaurantRoute)
export const managersRoute = Router
