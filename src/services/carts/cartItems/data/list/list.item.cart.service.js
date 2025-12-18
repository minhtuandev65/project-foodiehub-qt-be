import { models } from '~/models'

export const list = async (restaurantId, userId) => {
    const existBookTable = await models.bookTable.find.activeBookTableByUserId(
        String(userId),
        String(restaurantId)
    )
    if(!existBookTable){
        return {
            cartItemsList:[]
        }
    }
    const existCart = await models.cart.find.bookTableId(
        String(existBookTable._id)
    )
    const result = await models.cart.cartItems.data.list(String(existCart._id))

    const cartItemsList = result.cartItemsList.map((item) => {
        const totalPriceItem = Number(item.price) * Number(item.quantity)
        return {
            ...item,
            totalPriceItem
        }
    })
    const totalPrice = cartItemsList.reduce(
        (sum, it) => sum + (Number(it.totalPriceItem) || 0),
        0
    )
    return {
        ...result,
        cartItemsList,
        totalPrice
    }
}
