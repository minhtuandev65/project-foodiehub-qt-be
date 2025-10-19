import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'

export const updateNewPassword = async (data) => {
    try {
        const { userId, password } = data
        const updateNewPassword = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.USERS)
            .updateOne(
                { _id: new ObjectId(userId) },
                {
                    $set: { password }
                }
            )
        return updateNewPassword
    } catch (error) {
        throw new Error(error)
    }
}
