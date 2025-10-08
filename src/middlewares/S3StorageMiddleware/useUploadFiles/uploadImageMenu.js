import { createUploadMiddleware } from "../uploadMultiple";

export const uploadImageMenu = createUploadMiddleware(
    {
        fields: [
            { name: 'imageURL', type: 'image', maxCount: 1 },
        ],
        maxSizeMB: 5
    },
)