/* Service */
import { StatusCodes } from 'http-status-codes'
import { models } from '~/models'
import ApiError from '~/utils/ApiError'

export const bookTable = async (newData, t) => {
    try {
        const { userId, restaurantId, tableId, ...rawData } = newData

        const [existUser, existRestaurant, existTable] = await Promise.all([
            models.auth.find.accountById(userId),
            models.restaurant.find.id(restaurantId),
            models.table.find.id(tableId)
        ])
        // B1: kiểm tra user
        if (!existUser)
            throw new ApiError(StatusCodes.NOT_FOUND, t('user.emailNotFound'))
        if (!existUser.isActive)
            throw new ApiError(
                StatusCodes.NOT_ACCEPTABLE,
                t('user.emailNotActivated')
            )
        // B2: Kiểm tra nhà hàng đã tồn tại hay chưa và có hoạt động không
        if (!existRestaurant)
            throw new ApiError(
                StatusCodes.NOT_FOUND,
                t('managers.restaurantNotFound')
            )
        if (!existRestaurant.isActive)
            throw new ApiError(
                StatusCodes.NOT_ACCEPTABLE,
                t('managers.waitAcceptRestaurant')
            )
        // B3: kiểm tra bàn có tồn tại trong nhà hàng không
        if (!existTable) {
            throw new ApiError(StatusCodes.NOT_FOUND, t('table.notFound'))
        }
        if (String(existRestaurant._id) !== String(existTable.restaurantId)) {
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                t('table.notBelongToRestaurant')
            )
        }
        // B4: Kiểm tra một user chỉ được đặt một bàn tại một thời điểm
        const existBookTable =
            await models.bookTable.find.activeBookTableByUserId(
                String(existUser._id),
                String(existRestaurant._id)
            )
        if (existBookTable) {
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                t('bookTable.userOnlyBookOneTableAtATime')
            )
        }
        // B5: Tạo đặt bàn
        const newBookTable = {
            userId: String(existUser._id),
            restaurantId: String(existRestaurant._id),
            tableId: String(existTable._id),
            date: rawData.date,
            startTime: rawData.startTime,
            endTime: rawData.endTime
        }

        const result = await models.bookTable.create.bookTable(newBookTable)

        // B6: Tạo giỏ hàng
        const newCart = {
            userId: String(existUser._id),
            bookTableId: String(result.insertedId)
        }
        await models.cart.create.carts(newCart)
        return { _id: result.insertedId, ...newBookTable }
    } catch (error) {
        throw Error(error)
    }
}
