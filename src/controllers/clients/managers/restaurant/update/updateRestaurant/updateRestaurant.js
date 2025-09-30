import { StatusCodes } from 'http-status-codes'
import { restaurantServices } from '~/services/clients/managers/restaurant'

export const updateRestaurant = async (req, res, next) => {
    try {
        const restaurantId = req.params.restaurantId
        const userId = req.payload._id
        const logoURL = req.file
        const restaurantData = {
            ...req.body,
            restaurantId,
            logoURL
        }

        const data = await restaurantServices.updateRestaurant(
            userId,
            restaurantData
        )

        res.status(StatusCodes.OK).json({ message: 'Success', data })
    } catch (error) {
        next(error)
    }
}
