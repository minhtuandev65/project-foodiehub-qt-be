// src/middlewares/uploadMultiple.js
import multer from 'multer'

/**
 * Hàm tạo middleware upload nhiều file có thể tái sử dụng
 * @param {Object} options
 * @param {Array} options.fields - danh sách field: [{ name: 'logo', type: 'image', maxCount: 1 }, ...]
 * @param {number} options.maxSizeMB - dung lượng tối đa mỗi file
 */
export const createUploadMiddleware = ({ fields, maxSizeMB = 5 }) => {
    const storage = multer.memoryStorage()

    const imageTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
    const docTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]

    const fileFilter = (req, file, cb) => {
        const fieldConfig = fields.find((f) => f.name === file.fieldname)

        if (!fieldConfig) {
            return cb(new Error(`Unexpected field: ${file.fieldname}`), false)
        }

        if (
            fieldConfig.type === 'image' &&
            imageTypes.includes(file.mimetype)
        ) {
            return cb(null, true)
        }
        if (
            fieldConfig.type === 'document' &&
            docTypes.includes(file.mimetype)
        ) {
            return cb(null, true)
        }

        cb(new Error(`Invalid file type for field ${file.fieldname}`), false)
    }

    return multer({
        storage,
        fileFilter,
        limits: { fileSize: maxSizeMB * 1024 * 1024 }
    }).fields(fields.map(({ name, maxCount }) => ({ name, maxCount })))
}
