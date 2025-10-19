import { models } from '~/models'

export const getMyProfile = async (userId) => {
    try {
        const user = await models.user.data.getMyProfile(userId)

        return user
    } catch (error) {
        throw Error(error)
    }
}
