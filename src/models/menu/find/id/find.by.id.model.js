import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'

export const id = async (menuId) => {
    try {
        const exist = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.MENU)
            .findOne({
                _id: new ObjectId(menuId)
            })
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
