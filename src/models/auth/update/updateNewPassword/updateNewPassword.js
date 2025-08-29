import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { USER_COLLECTION_NAME } from '~/helpers'

export const updateNewPassword = async (data) => {
    try {
        const { userId, password } = data
        const updateNewPassword = await GET_DB()
            .collection(USER_COLLECTION_NAME)
            .updateOne(
                { _id: new ObjectId(userId) },
                {
                    $set: { password }
                }
            )
        return updateNewPassword
    } catch (error) {
        throw new Error(error)
    }
}
