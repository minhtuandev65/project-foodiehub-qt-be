import { StatusCodes } from 'http-status-codes'
import { restaurantServices } from '~/services/restaurant'

export const getDetailRestaurant = async (req, res, next) => {
    try {
        const restaurantId = req.params.restaurantId
        const data = await restaurantServices.getDetailRestaurant(restaurantId)
        res.status(StatusCodes.OK).json({
            status: 'Success',
            message: 'Get detail restaurant successfully',
            data
        })
    } catch (error) {
        throw new Error(error)
    }
}
