import { StatusCodes } from 'http-status-codes'
import { clientsServices } from '~/services/clients'

export const createNewCandidateProfile = async (req, res, next) => {
    try {
        const cvFile = req.files?.cv?.[0]
        if (!cvFile) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ message: 'CV is required' })
        }

        const userId = req.payload._id

        const { buffer, originalname } = cvFile
        const reqData = {
            ...req.body,
            userId,
            buffer,
            originalname
        }
        const updatedUser =
            await clientsServices.createNewCandidateProfile(reqData)

        res.status(StatusCodes.CREATED).json({
            status: 'success',
            message: 'Upload CV Success',
            data: updatedUser
        })
    } catch (error) {
        next(error)
    }
}
