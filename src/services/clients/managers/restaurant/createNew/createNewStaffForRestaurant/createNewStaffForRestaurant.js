import { StatusCodes } from 'http-status-codes'
import { authModels } from '~/models/auth'
import { restaurantModels } from '~/models/restaurant'
import ApiError from '~/utils/ApiError'
import { ROLE } from '~/utils/constants'

export const createNewStaffForRestaurant = async (addNewStaff) => {
    try {
        const { restaurantId, email, managerEmail } = addNewStaff
        const existUser = await authModels.findAccountByEmail(email)
        if (!existUser)
            throw new ApiError(StatusCodes.NOT_FOUND, 'Email not found!')
        if (existUser.isActive === false)
            throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Email not activate')
        if (existUser.email === managerEmail) {
            throw new ApiError(
                StatusCodes.NOT_ACCEPTABLE,
                'You cannot add yourself to the restaurant'
            )
        }
        if (
            existUser.role === ROLE.MANAGER ||
            existUser.role === ROLE.STAFF ||
            existUser.role === ROLE.ADMIN
        ) {
            throw new ApiError(
                StatusCodes.NOT_ACCEPTABLE,
                'User cannot be added to restaurant'
            )
        }
        const userId = existUser._id
        await authModels.updateNewRole(userId, ROLE.STAFF)
        const result = await restaurantModels.createNewStaffForRestaurant(
            userId,
            restaurantId
        )
        return result
    } catch (error) {
        throw Error(error)
    }
}
