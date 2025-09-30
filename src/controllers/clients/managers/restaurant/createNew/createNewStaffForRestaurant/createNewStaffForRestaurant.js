import { StatusCodes } from 'http-status-codes'
import { restaurantServices } from '~/services/clients/managers/restaurant'


export const createNewStaffForRestaurant = async (req, res, next) => {
    try {
        const email = req.body.email
        const managerEmail = req.payload.email
        const restaurantId = req.params.restaurantId
        const addNewStaff = {
            email,
            restaurantId,
            managerEmail
        }
        const data = await restaurantServices.createNewStaffForRestaurant(addNewStaff)
        res.status(StatusCodes.CREATED).json({ message: 'Success', data })
    } catch (error) {
        next(error)
    }
}
