import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { env } from '~/config/env/environment'

const s3Client = new S3Client({ region: env.AWS_REGION })

async function getUrlS3(fileKey) {
    const command = new GetObjectCommand({
        Bucket: env.S3_BUCKET,
        Key: fileKey
    })

    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 }) // 1 giờ
    return url
}

export default getUrlS3
