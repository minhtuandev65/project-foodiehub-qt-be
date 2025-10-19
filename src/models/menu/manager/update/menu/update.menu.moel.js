import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'

export const menu = async (menuId, newUpdateData) => {
    try {
        const { userId, ...rest } = newUpdateData
        Object.keys(newUpdateData).forEach((fieldName) => {
            if (
                helpers.mongo.invalidFields.INVALID_UPDATE_FIELDS_MENU.includes(
                    fieldName
                )
            ) {
                delete newUpdateData[fieldName]
            }
        })
        const exist = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.MENU)
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
