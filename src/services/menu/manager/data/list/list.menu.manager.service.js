import { models } from '~/models'

export const list = async (restaurantId) => {
    const result = await models.menu.manager.data.list(restaurantId)

    const menuList = result.menuList.map((item) => ({
        ...item,
        createdAt: new Date(item.createdAt).toLocaleDateString('vi-VN')
    }))

    return {
        ...result,
        menuList
    }
}
