import { models } from '~/models'
import { checkIsOpenRestaurant } from '~/utils/checkIsOpenRestaurant'

export const list = async (userId) => {
    const result = await models.restaurant.manager.data.list(userId)
    const restaurantList = result.restaurantList.map((item) => {
        const isOpen = checkIsOpenRestaurant(
            item.openDays,
            item.openTime,
            item.closeTime
        )
        return {
            ...item,
            isOpen: isOpen,
            createdAt: new Date(item.createdAt).toLocaleDateString('vi-VN')
        }
    })

    return {
        ...result,
        restaurantList
    }
}
