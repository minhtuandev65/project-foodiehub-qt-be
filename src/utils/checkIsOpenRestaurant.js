export const checkIsOpenRestaurant = (openDays, openTime, closeTime) => {
    // B1: Lấy thời gian hiện tại
    const now = new Date()

    // B2: Lấy thứ hiện tại (0-6, 0 = Chủ Nhật)
    const currentDay = now.getDay()

    // B3: Đổi giờ hiện tại sang tổng số phút từ 00:00
    const currentMinutes = now.getHours() * 60 + now.getMinutes()

    // B4: Tách giờ và phút từ chuỗi openTime / closeTime (định dạng 'HH:mm')
    const [openHour, openMinute] = openTime.split(':').map(Number)
    const [closeHour, closeMinute] = closeTime.split(':').map(Number)

    // B5: Đổi giờ mở cửa và giờ đóng cửa sang tổng số phút
    const openMinutes = openHour * 60 + openMinute
    const closeMinutes = closeHour * 60 + closeMinute

    // B6: Kiểm tra hôm nay có nằm trong danh sách ngày mở cửa hay không
    const isTodayOpen = openDays.includes(currentDay)

    // B7: Kiểm tra giờ hiện tại có nằm trong khoảng [openMinutes, closeMinutes] hay không
    const isInTimeRange =
        currentMinutes >= openMinutes && currentMinutes <= closeMinutes

    // B8: Nhà hàng mở khi vừa đúng ngày mở cửa, vừa đúng khung giờ
    return isTodayOpen && isInTimeRange
}
