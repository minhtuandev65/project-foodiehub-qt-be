import { models } from '~/models'
import { checkIsOpenRestaurant } from '~/utils/checkIsOpenRestaurant'

export const listStaff = async (filter) => {
    const result = await models.restaurant.manager.data.listStaff(filter)

    return result
}
