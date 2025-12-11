import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'

export const staff = async (staffId, newUpdateData) => {
    try {
        Object.keys(newUpdateData).forEach((fieldName) => {
            if (
                helpers.mongo.invalidFields.INVALID_UPDATE_FIELDS_STAFF.includes(
                    fieldName
                )
            ) {
                delete newUpdateData[fieldName]
            }
        })

        const exist = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.STAFF)
            .findOneAndUpdate(
                {
                    _id: new ObjectId(staffId),
                    _destroy: false
                },
                { $set: { ...newUpdateData, updatedAt: new Date() } },
                { returnDocument: 'after' }
            )
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
