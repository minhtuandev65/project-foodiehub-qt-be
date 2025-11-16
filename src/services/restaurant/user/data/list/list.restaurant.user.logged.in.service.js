import { models } from '~/models'

export const listLoggedIn = async (userId) => {
    const result = await models.restaurant.user.data.list()

    const restaurantList = await Promise.all(
        result.restaurantList.map(async (item) => {
            const favoriteDoc =
                await models.favorites.data.restaurantFavoritesOfUser({
                    userId,
                    restaurantId: String(item._id)
                })

            return {
                ...item,
                favorite: !!favoriteDoc,
                createdAt: new Date(item.createdAt).toLocaleDateString('vi-VN')
            }
        })
    )

    return {
        ...result,
        restaurantList
    }
}
