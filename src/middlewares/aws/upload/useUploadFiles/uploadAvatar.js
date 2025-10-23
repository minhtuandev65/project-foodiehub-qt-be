// src/middlewares/uploadAvatar.js
import { createUploadMiddleware } from '../multiple/uploadMultiple'

export const uploadAvatar = createUploadMiddleware({
    fields: [{ name: 'avatar', type: 'image', maxCount: 1 }],
    maxSizeMB: 2
})
