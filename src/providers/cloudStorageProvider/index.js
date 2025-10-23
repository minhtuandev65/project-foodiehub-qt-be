import getUrlS3 from './getUrlS3/getUrlS3'
import { streamUploadFileToS3 } from './uploadFileToS3/uploadFileS3'
import { uploadImageToS3 } from './uploadImageToS3/uploadImageToS3'

export const CloudStorageProvider = {
    getUrlS3,
    uploadImageToS3,
    streamUploadFileToS3
}
