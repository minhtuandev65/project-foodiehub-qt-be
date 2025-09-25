import { StatusCodes } from 'http-status-codes'
import adminServices from '~/services/admin'

export const assignRoleToUser = async (req, res, next) => {
    try {
        const reqData = req.body
        const data = await adminServices.assignRoleToUser(reqData)
        res.status(StatusCodes.CREATED).json({ message: 'Success', data })
    } catch (error) {
        next(error)
    }
}
