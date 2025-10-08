import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import {
    INVALID_UPDATE_FIELDS_MENU,
    MENU_RESTAURANT_COLLECTION_NAME
} from '~/helpers'

export const updateMenu = async (menuId, newUpdateData) => {
    try {
        const { userId, ...rest } = newUpdateData
        Object.keys(newUpdateData).forEach((fieldName) => {
            if (INVALID_UPDATE_FIELDS_MENU.includes(fieldName)) {
                delete newUpdateData[fieldName]
            }
        })
        const exist = await GET_DB()
            .collection(MENU_RESTAURANT_COLLECTION_NAME)
            .findOneAndUpdate(
                {
                    _id: new ObjectId(menuId),
                    _destroy: false
                },
                {
                    $set: {
                        ...rest,
                        lastUpdatedUserId: new ObjectId(userId),
                        updatedAt: new Date()
                    }
                },
                { returnDocument: 'after' }
            )
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
