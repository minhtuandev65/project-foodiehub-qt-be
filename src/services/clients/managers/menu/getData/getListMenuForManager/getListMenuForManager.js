import { menuModels } from '~/models/clients/manager/menu'

export const getListMenuForManager = async (restaurantId) => {
    const result = await menuModels.getListMenuForManager(restaurantId)

    const menuList = result.menuList.map((item) => ({
        ...item,
        createdAt: new Date(item.createdAt).toLocaleDateString('vi-VN')
    }))

    return {
        ...result,
        menuList
    }
}
