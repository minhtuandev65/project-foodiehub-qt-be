// src/middlewares/uploadOrganizationFiles.js

import { createUploadMiddleware } from '../uploadMultiple'

export const uploadRestaurantFiles = createUploadMiddleware(
    {
        fields: [
            { name: 'logoURL', type: 'image', maxCount: 1 },
            { name: 'businessCertificateImage', type: 'image', maxCount: 1 },
            { name: 'businessCertificateFile', type: 'document', maxCount: 1 }
        ],
        maxSizeMB: 5
    },
    (req, res) => {
        console.log('📁 req.files:', req.files)
        console.log('📦 req.body:', req.body)
        res.json({ ok: true })
    }
)
