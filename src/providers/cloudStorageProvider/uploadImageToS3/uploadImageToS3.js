import { S3Client } from '@aws-sdk/client-s3'
import { env } from '~/config/environment'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { Upload } from '@aws-sdk/lib-storage'

const s3Client = new S3Client({
    region: env.AWS_REGION,
    credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY
    }
})

export const uploadImageToS3 = async (file, originalFileName, folderName) => {
    const ext = path.extname(originalFileName)
    const key = `${folderName}/${uuidv4()}${ext}`

    const upload = new Upload({
        client: s3Client,
        params: {
            Bucket: env.S3_BUCKET,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype || 'image/jpeg'
        }
    })

    const result = await upload.done()
    return {
        key: result.Key,
        url: result.Location
    }
}
