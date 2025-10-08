import { MENU_COLLECTION_SCHEMA } from "../menuModel/menuMoel"

export const validateBeforeCreateMenu = async (data) => {
    return await MENU_COLLECTION_SCHEMA.validateAsync(data, {
        abortEarly: false
    })
}