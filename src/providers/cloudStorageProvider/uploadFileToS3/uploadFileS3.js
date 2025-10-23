// src/middlewares/uploadFileS3.js
import { Upload } from '@aws-sdk/lib-storage'
import { s3Client } from '~/config/aws/awsS3'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import { env } from '~/config/env/environment'

export const streamUploadFileToS3 = async (fileInfo, folderName) => {
    const ext = path.extname(fileInfo.originalname)
    const key = `${folderName}/${uuidv4()}${ext}`
    const realBuffer = Buffer.from(fileInfo.buffer.data)
    const upload = new Upload({
        client: s3Client,
        params: {
            Bucket: env.S3_BUCKET,
            Key: key,
            Body: realBuffer,
            ContentType: getMimeType(ext)
        }
    })

    const result = await upload.done()
    return {
        key: result.Key,
        url: result.Location
    }
}

const getMimeType = (ext) => {
    switch (ext.toLowerCase()) {
        case '.pdf':
            return 'application/pdf'
        case '.doc':
            return 'application/msword'
        case '.docx':
            return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        default:
            return 'application/octet-stream'
    }
}

