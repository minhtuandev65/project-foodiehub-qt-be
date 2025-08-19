import { StatusCodes } from 'http-status-codes'
import { authServices } from '~/services/auth'

export const createNewAccount = async (req, res, next) => {
    try {
        const createNew = await authServices.createNewAccount(req.body)

        res.status(StatusCodes.CREATED).json(createNew)
    } catch (error) {
        next(error)
    }
}
