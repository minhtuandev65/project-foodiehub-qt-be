import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'

export const updateNewRole = async (userId, role) => {
    console.log(userId)
    console.log(role)
    try {
        await config.mongo
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
        return {userId: userId, role: role}
    } catch (error) {
        throw new Error(error)
    }
}
