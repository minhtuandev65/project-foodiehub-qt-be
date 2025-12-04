import { models } from '~/models'

export const listLoggedIn = async (userId, filter) => {
    const result = await models.restaurant.user.data.list(filter)

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
    let finalList = restaurantList

    // Nếu yêu cầu lọc theo "favorite"
    if (filter?.status == 1) {
        finalList = restaurantList.filter((item) => item.favorite)
    }

    return {
        ...result,
        restaurantList: finalList
    }
}
