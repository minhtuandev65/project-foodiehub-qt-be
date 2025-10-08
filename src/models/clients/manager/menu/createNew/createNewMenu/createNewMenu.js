import { ObjectId } from "mongodb"
import { validateBeforeCreateMenu } from "../../validateBeforeCreateMenu/validateBeforeCreateMenu"
import { GET_DB } from "~/config/mongodb"
import { MENU_RESTAURANT_COLLECTION_NAME } from "~/helpers"

export const createNewMenu = async (newMenu) => {
    try {
        const valiData = await validateBeforeCreateMenu(newMenu)
        const dataToInsert = {
            ...valiData,
            creatorId: new ObjectId(valiData.creatorId),
            restaurantId: new ObjectId(valiData.restaurantId),
            createdAt: new Date()
        }
        const exist = GET_DB()
            .collection(MENU_RESTAURANT_COLLECTION_NAME)
            .insertOne(dataToInsert)
        return exist
    } catch (error) {
        throw new Error(error)
    }
}