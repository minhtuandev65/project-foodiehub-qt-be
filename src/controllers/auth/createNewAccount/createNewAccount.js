import { StatusCodes } from 'http-status-codes'
import { authServices } from '~/services/auth'

export const createNewAccount = async (req, res, next) => {
    try {
        const reqData = req.body
        const createNew = await authServices.createNewAccount(reqData)

        const { verifyToken, ...data } = createNew
        res.status(StatusCodes.CREATED).json({
            message: 'Create new account successfully!',
            data
        })
    } catch (error) {
        next(error)
    }
}
