import { StatusCodes } from 'http-status-codes'
import { clientsServices } from '~/services/clients'

export const createNewCandidateProfile = async (req, res, next) => {
    try {
        const file = req.files?.cv?.[0]
        if (!file) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ message: 'CV is required' })
        }

        const userId = req.payload._id

        const reqData = {
            ...req.body,
            userId,
            file
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
