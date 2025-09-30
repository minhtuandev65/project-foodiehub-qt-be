import express from 'express'
import { clientsController } from '~/controllers/clients'
import isAuthorized, { hasRole } from '~/middlewares/authMiddleware'
import { ROLE } from '~/utils/constants'
import { restaurantRoute } from './restaurant/restaurantRoute'
const Router = express.Router()

Router.get(
    '/getDetailCandidateProfile/:userId/detail',
    isAuthorized,
    hasRole(ROLE.MANAGER),
    clientsController.getDetailCandidateProfile
)
Router.get(
    '/getListCandidateProfile/:restaurantId',
    isAuthorized,
    hasRole(ROLE.MANAGER),
    clientsController.getListCandidateProfile
)
Router.use('/restaurant', restaurantRoute)
export const managersRoute = Router
