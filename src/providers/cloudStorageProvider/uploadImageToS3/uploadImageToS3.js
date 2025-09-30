// src/providers/cloudStorageProvider/uploadImageToS3/uploadImageToS3.js
import { env } from '~/config/environment'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { Upload } from '@aws-sdk/lib-storage'
import { s3Client } from '~/config/awsS3'

export const uploadImageToS3 = async (fileInfo, folderName = '') => {
    const ext = path.extname(fileInfo.originalname)
    const key = `${folderName}/${uuidv4()}${ext}`

    const realBuffer = Buffer.from(fileInfo.buffer.data)

    const upload = new Upload({
        client: s3Client,
        params: {
            Bucket: env.S3_BUCKET,
            Key: key,
            Body: realBuffer,
            ContentType: fileInfo.mimetype
        }
    })

    const result = await upload.done()

    return {
        key: result.Key,
        url: result.Location
    }
}
