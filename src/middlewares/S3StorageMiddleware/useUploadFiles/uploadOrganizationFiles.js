// src/middlewares/uploadOrganizationFiles.js

import { createUploadMiddleware } from '../uploadMultiple'

export const uploadOrganizationFiles = createUploadMiddleware({
    fields: [
        { name: 'logoURL', type: 'image', maxCount: 1 },
        { name: 'businessCertificateImage', type: 'image', maxCount: 1 },
        { name: 'businessCertificateFile', type: 'document', maxCount: 1 }
    ],
    maxSizeMB: 50
})
