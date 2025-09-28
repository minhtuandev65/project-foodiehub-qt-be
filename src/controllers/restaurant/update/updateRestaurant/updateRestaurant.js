import { StatusCodes } from 'http-status-codes'
import { restaurantServices } from '~/services/restaurant'

export const updateRestaurant = async (req, res, next) => {
    try {
        const organizationId = req.params.organizationId
        const userId = req.payload._id
        const logoURL = req.file
        const restaurantData = {
            ...req.body,
            organizationId,
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
