import { CloudStorageProvider } from '~/providers/cloudStorageProvider'

export const uploadBusinessCertificateImage = async (
    businessCertificateImage
) => {
    const { buffer, mimetype, originalname } = businessCertificateImage
    const result =
        await CloudStorageProvider.uploadImageToS3(
            { buffer, mimetype },
            'business-certificate-image',
            originalname
        )
    return { key: result.key }
}
