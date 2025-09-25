import { StatusCodes } from 'http-status-codes'
import { clientsServices } from '~/services/clients'

export const uploadCVFile = async (req, res, next) => {
    try {
        if (!req.file) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ message: 'CV is required' })
        }

        const userId = req.payload._id
        const { buffer, originalname } = req.file

        const updatedUser = await clientsServices.uploadCVFile({
            userId,
            fileBuffer: buffer,
            fileName: originalname
        })

        res.status(StatusCodes.CREATED).json({
            status: 'success',
            message: 'Upload CV Success',
            data: updatedUser
        })
    } catch (error) {
        next(error)
    }
}
