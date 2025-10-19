import { models } from '~/models'

export const list = async () => {
    const result = await models.user.admin.data.list()

    const userList = result.userList.map((item) => ({
        ...item,
        createdAt: new Date(item.createdAt).toLocaleDateString('vi-VN')
    }))

    return {
        ...result,
        userList
    }
}
