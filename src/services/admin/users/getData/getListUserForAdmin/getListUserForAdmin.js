import { adminModes } from "~/models/admin"

export const getListUserForAdmin = async () => {
    const result = await adminModes.getListUserForAdmin()

    const userList = result.userList.map((item) => ({
        ...item,
        createdAt: new Date(item.createdAt).toLocaleDateString('vi-VN')
    }))

    return {
        ...result,
        userList
    }
}