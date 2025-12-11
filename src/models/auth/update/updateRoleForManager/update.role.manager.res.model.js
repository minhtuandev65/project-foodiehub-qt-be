/* models */
import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'

export const updateRoleUser = async (userId, updatedData) => {
    try {
        Object.keys(updatedData).forEach((fieldName) => {
            if (
                helpers.mongo.invalidFields.INVALID_UPDATE_FIELDS_USER_MANAGER.includes(
                    fieldName
                )
            ) {
                delete updatedData[fieldName]
            }
        })

        const exist = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.USERS)
            .findOneAndUpdate(
                {
                    _id: new ObjectId(userId),
                    _destroy: false
                },
                { $set: { ...updatedData, updatedAt: new Date() } },
                { returnDocument: 'after' }
            )
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
