import { createUploadMiddleware } from '../multiple/uploadMultiple'

export const uploadImageMenu = createUploadMiddleware({
    fields: [{ name: 'imageURL', type: 'image', maxCount: 10 }],
    maxSizeMB: 5
})
