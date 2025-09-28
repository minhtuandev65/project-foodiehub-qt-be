// src/middlewares/uploadCv.js
import { createUploadMiddleware } from '../uploadMultiple'

export const uploadCv = createUploadMiddleware({
    fields: [{ name: 'cv', type: 'document', maxCount: 1 }],
    maxSizeMB: 10
})
