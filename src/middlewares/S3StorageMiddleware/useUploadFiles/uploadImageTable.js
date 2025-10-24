import { createUploadMiddleware } from "../../aws/upload/multiple/uploadMultiple";

export const uploadImageTable = createUploadMiddleware(
    {
        fields: [
            { name: 'imageURL', type: 'image', maxCount: 3 },
        ],
        maxSizeMB: 5
    },
)