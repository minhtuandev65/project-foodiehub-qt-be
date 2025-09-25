import { streamUploadBusinessCertificateFile } from './businessCertificateFile'
import { streamUploadCvsFile } from './cvsFile'
import getCvUrl from './getCvUrl'

export const CloudStorageProvider = {
    streamUploadCvsFile,
    streamUploadBusinessCertificateFile,
    getCvUrl
}
