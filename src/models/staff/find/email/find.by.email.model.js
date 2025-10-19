import { config } from '~/config'
import { helpers } from '~/helpers'

export const email = async (emailValue) => {
    try {
        const exist = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.STAFF)
            .findOne({ email: emailValue })

        return exist
    } catch (error) {
        throw new Error(error)
    }
}
