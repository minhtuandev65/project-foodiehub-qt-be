import { GET_DB } from '~/config/mongodb'
import { STAFF_RESTAURANT_COLLECTION_NAME } from '~/helpers'

export const findStaffByEmail = async (emailValue) => {
    try {
        const exist = await GET_DB()
            .collection(STAFF_RESTAURANT_COLLECTION_NAME)
            .findOne({ email: emailValue })

        return exist
    } catch (error) {
        throw new Error(error)
    }
}
