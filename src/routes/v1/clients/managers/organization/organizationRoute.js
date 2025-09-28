import express from 'express'
import { organizationController } from '~/controllers/organization'
import isAuthorized, { hasRole } from '~/middlewares/authMiddleware'
import { uploadOrganizationFiles } from '~/middlewares/S3StorageMiddleware/useUploadFiles/uploadOrganizationFiles'
import { ROLE } from '~/utils/constants'

const Router = express.Router()

Router.route('/createNewOrganization').post(
    isAuthorized,
    hasRole(ROLE.MANAGER),
    uploadOrganizationFiles,
    organizationController.createNewOrganization
)
Router.route('/:organizationId/addStaff').post(
    isAuthorized,
    hasRole(ROLE.MANAGER),
    organizationController.addNewStaff
)
Router.route('/:organizationId/update').put(
    isAuthorized,
    hasRole(ROLE.MANAGER),
    organizationController.updateOrganization
)

export const organizationRoute = Router
