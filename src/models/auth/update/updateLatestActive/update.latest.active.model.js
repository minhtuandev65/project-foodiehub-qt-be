import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'

export const updateLatestActiveEmail = async (userId, updatedData = {}) => {
    try {
        Object.keys(updatedData).forEach((fieldName) => {
            if (
                helpers.mongo.invalidFields.INVALID_UPDATE_FIELDS_USER_ACTIVE_EMAIL.includes(
                    fieldName
                )
            ) {
                delete updatedData[fieldName]
            }
        })
        const result = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.USERS)
            .findOneAndUpdate(
                { _id: new ObjectId(userId), _destroy: false },
                {
                    $set: {
                        ...updatedData,
                        latestActiveAt: new Date(),
                        updatedAt: new Date()
                    }
                }
            )

        return result
    } catch (error) {
        throw new Error(error)
    }
}
