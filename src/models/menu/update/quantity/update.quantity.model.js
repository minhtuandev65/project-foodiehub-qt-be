import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'

export const quantity = async (data) => {
    try {
        const { menuId, ...rest } = data
        Object.keys(rest).forEach((fieldName) => {
            if (
                helpers.mongo.invalidFields.INVALID_UPDATE_QUANTITY_FIELDS_MENU.includes(
                    fieldName
                )
            ) {
                delete rest[fieldName]
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
