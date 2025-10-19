export const checkIsOpenRestaurant = async (openDays, openTime, closeTime) => {
    const now = new Date()

    // 🗓️ Lấy thứ hiện tại (0 = Chủ nhật → 7)
    let currentDay = now.getDay()
    if (currentDay === 0) currentDay = 7

    // ⏱️ Kiểm tra có mở cửa hôm nay không
    if (!openDays.includes(currentDay)) {
        return false
    }

    // 🕐 Tạo đối tượng thời gian mở/đóng cửa hôm nay
    const [openHour, openMinute] = openTime.split(':').map(Number)
    const [closeHour, closeMinute] = closeTime.split(':').map(Number)

    const openDate = new Date(now)
    openDate.setHours(openHour, openMinute, 0, 0)

    const closeDate = new Date(now)
    closeDate.setHours(closeHour, closeMinute, 0, 0)

    // 🔁 Nếu giờ đóng nhỏ hơn giờ mở => qua ngày hôm sau (ví dụ mở 22:00 tới 02:00)
    if (closeDate <= openDate) {
        closeDate.setDate(closeDate.getDate() + 1)
    }

    // ✅ So sánh thời gian hiện tại
    return now >= openDate && now <= closeDate
}
