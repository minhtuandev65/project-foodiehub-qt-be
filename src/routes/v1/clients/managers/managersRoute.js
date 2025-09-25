import express from 'express'
import { clientsController } from '~/controllers/clients'
import isAuthorized, { hasRole } from '~/middlewares/authMiddleware'
import { ROLE } from '~/utils/constants'
const Router = express.Router()

Router.get(
    '/getCvUser/:userId',
    isAuthorized,
    hasRole(ROLE.MANAGER),
    clientsController.getCvUser
)

export const managersRoute = Router
