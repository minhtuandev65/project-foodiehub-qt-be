import { authModels } from '~/models/auth'

export const getMyProfile = async (userId) => {
    try {
        const user = await authModels.getMyProfile(userId)

        return user
    } catch (error) {
        throw Error(error)
    }
}
