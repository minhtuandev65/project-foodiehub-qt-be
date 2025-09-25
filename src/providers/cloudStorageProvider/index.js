import { streamUploadBusinessCertificateFile } from './businessCertificateFile/businessCertificateFile'
import { streamUploadCvsFile } from './cvsFile/cvsFile'
import getCvUrl from './getCvUrl/getCvUrl'
import { uploadImageToS3 } from './uploadImageToS3/uploadImageToS3'

export const CloudStorageProvider = {
    streamUploadCvsFile,
    streamUploadBusinessCertificateFile,
    getCvUrl,
    uploadImageToS3
}
