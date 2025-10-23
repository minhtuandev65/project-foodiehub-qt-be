import crypto from 'node:crypto'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { env } from '~/config/env/environment'

const s3 = new S3Client({ region: env.AWS_REGION })

export async function presignBatchMenu(req, res) {
  const { folder, files } = req.body
  // validate: folder thuộc whitelist: ["menu-items","banners","avatars",...]
  // validate: mime/type/size theo chính sách (jpeg/png/webp)
  const restaurantId = req.params.restaurantId
  const results = await Promise.all(
    files.map(async (f) => {
      const key = `${folder}/${restaurantId}/${crypto.randomUUID()}-${f.fileName}`
      const cmd = new PutObjectCommand({
        Bucket: env.S3_BUCKET,
        Key: key,
        ContentType: f.mimeType,
        ACL: 'public-read' // public qua CDN; nếu dùng CloudFront Private thì bỏ ACL và cấu hình OAC
      })
      const uploadUrl = await getSignedUrl(s3, cmd, { expiresIn: 60 }) // 60s
      const fileUrl = `${env.CDN_BASE_URL}/${key}` // hiển thị trực tiếp từ CDN
      return { key, uploadUrl, headers: { 'Content-Type': f.mimeType }, fileUrl }
    })
  )
  res.json({ items: results, expiresIn: 60 })
}
