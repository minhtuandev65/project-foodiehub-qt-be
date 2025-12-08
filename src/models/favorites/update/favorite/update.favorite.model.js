import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'

export const favorite = async (data) => {
    try {
        const { restaurantId, userId, ...rest } = data
        Object.keys(rest).forEach((fieldName) => {
            if (
                helpers.mongo.invalidFields.INVALID_UPDATE_FAVORITE_FIELDS.includes(
                    fieldName
                )
            ) {
                delete rest[fieldName]
            }
        })
        const exist = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.FAVORITES)
            .findOneAndUpdate(
                {
                    restaurantId: new ObjectId(restaurantId),
                    userId: new ObjectId(userId),
                    favorite: true
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
