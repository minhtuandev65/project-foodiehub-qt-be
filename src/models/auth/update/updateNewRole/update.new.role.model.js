import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'

export const updateNewRole = async (userId, role) => {
    try {
        return await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.USERS)
            .updateOne(
                {
                    _id: new ObjectId(userId)
                },
                {
                    $set: { role: role }
                }
            )
    } catch (error) {
        throw new Error(error)
    }
}
