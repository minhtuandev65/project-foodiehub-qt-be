import { CloudStorageProvider } from '~/providers/cloudStorageProvider'

export const uploadLogo = async (logoURL) => {
    const { buffer, mimetype, originalname } = logoURL
    const uploadResultLogo = await CloudStorageProvider.uploadImageToS3(
        { buffer, mimetype },
        'logo-organization',
        originalname
    )
    return uploadResultLogo
}
