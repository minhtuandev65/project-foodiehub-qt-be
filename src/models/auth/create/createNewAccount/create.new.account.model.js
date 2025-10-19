import { config } from '~/config'
import { helpers } from '~/helpers'
import { validations } from '~/validations'

export const createNewAccount = async (newUser) => {
    try {
        const validData = await validations.beforeCreate.auth(newUser)
        const createNewUser = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.USERS)
            .insertOne(validData)
        return createNewUser
    } catch (error) {
        throw new Error(error)
    }
}
