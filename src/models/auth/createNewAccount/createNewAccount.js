import { GET_DB } from '~/config/mongodb'
import { validateBeforeCreateAuth } from '../validateBeforeCreateAuth/validateBeforeCreateAuth'
import { USER_COLLECTION_NAME } from '~/helpers'

export const createNewAccount = async (newUser) => {
    try {
        const validData = await validateBeforeCreateAuth(newUser)
        const createNewUser = await GET_DB()
            .collection(USER_COLLECTION_NAME)
            .insertOne(validData)
        return createNewUser
    } catch (error) {
        throw new Error(error)
    }
}
