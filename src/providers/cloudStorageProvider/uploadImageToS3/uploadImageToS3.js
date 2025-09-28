// src/providers/cloudStorageProvider/uploadImageToS3/uploadImageToS3.js
import { env } from '~/config/environment'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { Upload } from '@aws-sdk/lib-storage'
import { s3Client } from '~/config/awsS3'


export const uploadImageToS3 = async (file, originalFileName, folderName) => {
    const ext = path.extname(originalFileName)
    const key = `${folderName}/${uuidv4()}${ext}`

    const upload = new Upload({
        client: s3Client,
        params: {
            Bucket: env.S3_BUCKET,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype
        }
    })

    const result = await upload.done()
    return {
        key: result.Key,
        url: result.Location
    }
}
