import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { MENU_RESTAURANT_COLLECTION_NAME } from '~/helpers'

export const findMenuById = async (menuId) => {
    try {
        const exist = await GET_DB()
            .collection(MENU_RESTAURANT_COLLECTION_NAME)
            .findOne({
                _id: new ObjectId(menuId)
            })
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
