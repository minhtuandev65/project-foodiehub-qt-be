import { createNewMenu } from './createNew/createNewMenu/createNewMenu'
import { findMenuById } from './findMenuById/findMenuById'
import { getListMenuForManager } from './getData/getListMenu/getListMenu'
import { MENU_COLLECTION_SCHEMA } from './menuModel/menuMoel'
import { updateMenu } from './update/updateMenu/updateMenu'

export const menuModels = {
    MENU_COLLECTION_SCHEMA,
    createNewMenu,
    updateMenu,
    findMenuById,
    getListMenuForManager
}
