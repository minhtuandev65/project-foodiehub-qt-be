import { config } from '~/config'
import { helpers } from '~/helpers'

export const accountByEmail = async (emailValue) => {
    console.log(emailValue)
    try {
        const exist = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.USERS)
            .findOne({ email: emailValue })

        return exist
    } catch (error) {
        throw new Error(error)
    }
}
