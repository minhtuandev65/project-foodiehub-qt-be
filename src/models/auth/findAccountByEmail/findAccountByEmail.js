import { GET_DB } from '~/config/mongodb'
import { USER_COLLECTION_NAME } from '~/helpers'

export const findAccountByEmail = async (emailValue) => {
    try {
        const exist = await GET_DB()
            .collection(USER_COLLECTION_NAME)
            .findOne({ email: emailValue })

        return exist
    } catch (error) {
        throw new Error(error)
    }
}
