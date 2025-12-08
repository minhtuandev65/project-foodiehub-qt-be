/* Service */
import { StatusCodes } from 'http-status-codes'
import { models } from '~/models'
import ApiError from '~/utils/ApiError'
const pad2 = (n) => (n < 10 ? '0' + n : String(n))

const parseDateAndTimeToDate = (dateStr, timeStr) => {
    // dateStr expected "YYYY-MM-DD"
    // timeStr expected "HH:mm" (or "HH:mm:ss"), but we'll accept "HH:mm"
    if (!dateStr || !timeStr) return null

    const dateParts = dateStr.split('-').map((p) => parseInt(p, 10))
    if (dateParts.length !== 3) return null
    const [year, month, day] = dateParts // month 1-12

    const timeParts = timeStr.split(':').map((p) => parseInt(p, 10))
    const hour = timeParts[0] ?? 0
    const minute = timeParts[1] ?? 0
    const second = timeParts[2] ?? 0

    // new Date(year, monthIndex, day, hour, minute, second) uses local timezone
    return new Date(year, month - 1, day, hour, minute, second)
}

const formatTimeHHmm = (dateObj) => {
    if (!(dateObj instanceof Date) || Number.isNaN(dateObj.getTime()))
        return null
    return `${pad2(dateObj.getHours())}:${pad2(dateObj.getMinutes())}`
}

export const bookTable = async (newData, t) => {
    try {
        console.log(newData)
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
        // ===== B5: Tạo đặt bàn + tính endTime = startTime + 90 phút =====
        // rawData.date expected "YYYY-MM-DD"
        // rawData.startTime expected "HH:mm" (thường từ frontend)
        let endTime = null
        let startDateObj = null

        // Nếu frontend gửi startTime là Date object hoặc ISO string
        if (rawData.startTime instanceof Date) {
            startDateObj = rawData.startTime
        } else if (
            typeof rawData.startTime === 'string' &&
            rawData.startTime.includes('T')
        ) {
            // ISO string
            const tmp = new Date(rawData.startTime)
            if (!Number.isNaN(tmp.getTime())) startDateObj = tmp
        } else {
            // Ghép date + time (most common)
            startDateObj = parseDateAndTimeToDate(
                rawData.date,
                rawData.startTime
            )
        }

        if (!startDateObj || Number.isNaN(startDateObj.getTime())) {
            // Nếu không parse được, trả lỗi rõ ràng
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                t('bookTable.invalidStartTime')
            )
        }

        // cộng 90 phút
        const endDateObj = new Date(startDateObj.getTime() + 90 * 60 * 1000)
        endTime = formatTimeHHmm(endDateObj)

        const newBookTable = {
            userId: String(existUser._id),
            restaurantId: String(existRestaurant._id),
            tableId: String(existTable._id),
            date: rawData.date,
            startTime: rawData.startTime,
            endTime // thêm endTime
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
