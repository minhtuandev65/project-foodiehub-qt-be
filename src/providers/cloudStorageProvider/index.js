import { streamUploadBusinessCertificateFile } from './businessCertificateFile/businessCertificateFile'
import { streamUploadCvsFile } from './cvsFile/cvsFile'
import getUrlS3 from './getUrlS3/getUrlS3'
import { uploadImageToS3 } from './uploadImageToS3/uploadImageToS3'

export const CloudStorageProvider = {
    streamUploadCvsFile,
    streamUploadBusinessCertificateFile,
    getUrlS3,
    uploadImageToS3
}
