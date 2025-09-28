import { StatusCodes } from 'http-status-codes'
import { restaurantServices } from '~/services/restaurant'

export const getListRestaurant = async (req, res, next) => {
    try {
        const data = await restaurantServices.getListRestaurant()

        res.status(StatusCodes.OK).json({
            status: 'Success',
            message: 'Get list restaurant successfully',
            data
        })
    } catch (error) {
        throw new Error(error)
    }
}
