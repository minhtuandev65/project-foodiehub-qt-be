import { models } from '~/models'

export const menu = async (data) => {
    return await models.menu.MENU_COLLECTION_SCHEMA.validateAsync(data, {
        abortEarly: false
    })
}
