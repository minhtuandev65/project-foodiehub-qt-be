import { StatusCodes } from 'http-status-codes'
import { organizationServices } from '~/services/organization'

export const addNewStaff = async (req, res, next) => {
    try {
        const emailValue = req.body
        const organizationId = req.params.organizationId
        const addNewStaff = {
            emailValue,
            organizationId
        }
        const data = await organizationServices.addNewStaff(addNewStaff)
        res.status(StatusCodes.CREATED).json({ message: 'Success', data })
    } catch (error) {
        next(error)
    }
}
