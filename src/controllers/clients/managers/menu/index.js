import { createNewMenu } from "./createNew/createNewMenu/createNewMenu";
import { deleteMenuForRestaurant } from "./delete/deleteMenuForRestaurant/deleteMenuForRestaurant";
import { getListMenuForManager } from "./getData/getListMenuForManager/getListMenuForManager";
import { updateMenu } from "./update/updateMenu/updateMenu";

export const menuControllers = {
    createNewMenu,
    updateMenu,
    getListMenuForManager,
    deleteMenuForRestaurant
}