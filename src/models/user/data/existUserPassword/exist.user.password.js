import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'

export const existUserPassword = async (id) => {
    try {
        const user = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.USERS)
            .findOne({ _id: new ObjectId(id) })

        return user
    } catch (error) {
        throw new Error(error)
    }
}
