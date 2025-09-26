import express from 'express'
import { clientsController } from '~/controllers/clients'
import isAuthorized, { hasRole } from '~/middlewares/authMiddleware'
import { uploadSingleFile } from '~/middlewares/S3StorageMiddleware/multerCvUploadMiddleware'
import { ROLE } from '~/utils/constants'

const Router = express.Router()
Router.route('/upload-cv').post(
    isAuthorized,
    hasRole(ROLE.USER),
    uploadSingleFile,
    clientsController.uploadCVFile
)

export const usersRoute = Router
