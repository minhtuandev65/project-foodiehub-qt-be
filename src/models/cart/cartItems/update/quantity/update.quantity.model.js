import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'

export const quantity = async (data) => {
    try {
        const { cartItemsId, menuId, ...rest } = data
        Object.keys(rest).forEach((fieldName) => {
            if (
                helpers.mongo.invalidFields.INVALID_UPDATE_QUANTITY_FIELDS_CART_ITEMS.includes(
                    fieldName
                )
            ) {
                delete rest[fieldName]
            }
        })
        const exist = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.CART_ITEMS)
            .findOneAndUpdate(
                {
                    _id: new ObjectId(cartItemsId),
                    menuId: new ObjectId(menuId),
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
