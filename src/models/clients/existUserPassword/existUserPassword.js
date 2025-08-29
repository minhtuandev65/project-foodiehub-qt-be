import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { USER_COLLECTION_NAME } from '~/helpers'

export const existUserPassword = async (id) => {
    try {
        const user = await GET_DB()
            .collection(USER_COLLECTION_NAME)
            .findOne({ _id: new ObjectId(id) })

        return user
    } catch (error) {
        throw new Error(error)
    }
}
