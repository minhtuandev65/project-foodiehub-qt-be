import { StatusCodes } from 'http-status-codes'
import { authServices } from '~/services/auth'

export const verifyAccount = async (req, res, next) => {
    try {
        const result = await authServices.verifyAccount(req.body)
        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        next(error)
    }
}
