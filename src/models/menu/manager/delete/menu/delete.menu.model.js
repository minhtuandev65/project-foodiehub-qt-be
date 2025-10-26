import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'

export const menu = async (menuId, data) => {
    try {
        const { userId, ...rest } = data
        Object.keys(data).forEach((fieldName) => {
            if (
                helpers.mongo.invalidFields.INVALID_DELETE_FIELDS_MENU.includes(
                    fieldName
                )
            ) {
                delete data[fieldName]
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
