import { StatusCodes } from 'http-status-codes'
import { models } from '~/models'
import ApiError from '~/utils/ApiError'

const pad2 = (n) => (n < 10 ? '0' + n : String(n))

const formatTimeHHmm = (dateObj) => {
    if (!(dateObj instanceof Date) || Number.isNaN(dateObj.getTime()))
        return null
    return `${pad2(dateObj.getHours())}:${pad2(dateObj.getMinutes())}`
}

const formatDateYYYYMMDD = (dateObj) => {
    if (!(dateObj instanceof Date) || Number.isNaN(dateObj.getTime()))
        return null
    const y = dateObj.getFullYear()
    const m = pad2(dateObj.getMonth() + 1)
    const d = pad2(dateObj.getDate())
    return `${y}-${m}-${d}`
}

/**
 * bookTable for offline booking: server uses "now" as start time.
 * newData: { userId, restaurantId, tableId, ... }
 * t: translation function
 */
export const bookTable = async (newData, t) => {
    const { userId, restaurantId, tableId } = newData

    const [existUser, existRestaurant, existTable] = await Promise.all([
        models.auth.find.accountById(userId),
        models.restaurant.find.id(restaurantId),
        models.table.find.id(tableId)
    ])

    if (!existUser)
        throw new ApiError(StatusCodes.NOT_FOUND, t('user.emailNotFound'))
    if (!existUser.isActive)
        throw new ApiError(
            StatusCodes.NOT_ACCEPTABLE,
            t('user.emailNotActivated')
        )
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
    if (!existTable)
        throw new ApiError(StatusCodes.NOT_FOUND, t('table.notFound'))
    if (String(existRestaurant._id) !== String(existTable.restaurantId)) {
        throw new ApiError(
            StatusCodes.BAD_REQUEST,
            t('table.notBelongToRestaurant')
        )
    }

    // --- offline booking: dùng thời điểm hiện tại trên server ---
    const now = new Date()
    const DURATION_MINUTES = 90
    const endDateObj = new Date(now.getTime() + DURATION_MINUTES * 60 * 1000)

    const dateStr = formatDateYYYYMMDD(now) // "YYYY-MM-DD"
    const startTimeStr = formatTimeHHmm(now) // "HH:mm"
    const endTimeStr = formatTimeHHmm(endDateObj) // "HH:mm"

    const newBookTable = {
        userId: String(existUser._id),
        restaurantId: String(existRestaurant._id),
        tableId: String(existTable._id),
        date: dateStr,
        startTime: startTimeStr,
        endTime: endTimeStr,
        bookOffline: true
    }

    const result = await models.bookTable.staff.create.bookTable(newBookTable)

    const newCart = {
        userId: String(existUser._id),
        bookTableId: String(result.insertedId)
    }
    await models.cart.create.carts(newCart)

    return { _id: result.insertedId, ...newBookTable }
}
