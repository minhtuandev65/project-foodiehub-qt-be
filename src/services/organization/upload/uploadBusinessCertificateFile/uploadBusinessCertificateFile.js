import { S3StorageCvFile } from '~/middlewares/S3StorageMiddleware/uploadFileS3'

export const uploadBusinessCertificateFile = async (
    businessCertificateFile
) => {
    const { buffer, originalname } = businessCertificateFile
    const result = await S3StorageCvFile.streamUploadFile(
        buffer,
        originalname,
        'business-certificate-file'
    )
    return { key: result.key }
}
