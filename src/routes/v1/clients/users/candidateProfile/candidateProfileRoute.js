import express from 'express'
import { clientsController } from '~/controllers/clients'
import isAuthorized, { hasRole } from '~/middlewares/authMiddleware'
import { uploadCv } from '~/middlewares/S3StorageMiddleware/useUploadFiles/uploadCv'
import { ROLE } from '~/utils/constants'

const Router = express.Router()
Router.route('/createNewCandidateProfile').post(
    isAuthorized,
    hasRole(ROLE.USER),
    uploadCv,
    clientsController.createNewCandidateProfile
)

export const candidateProfileRoute = Router
