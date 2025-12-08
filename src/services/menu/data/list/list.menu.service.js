import { models } from '~/models'

export const list = async (restaurantId) => {
    const result = await models.menu.data.list(restaurantId)

    const menuList = result.menuList.map((item) => {
        const isAvailable = Number(item.quantity) !== 0
        return {
            ...item,
            isAvailable
        }
    })

    return {
        ...result,
        menuList
    }
}
