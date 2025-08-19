import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { USER_COLLECTION_NAME } from '~/helpers'

export const findAccountById = async (id) => {
    try {
        const user = await GET_DB()
            .collection(USER_COLLECTION_NAME)
            .findOne({ _id: new ObjectId(id) }, { projection: { password: 0 } })

        return user
    } catch (error) {
        throw new Error(error)
    }
}
