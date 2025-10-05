import { ObjectId } from "mongodb"
import { STAFF_RESTAURANT_COLLECTION_NAME } from "~/helpers"
import { validateBeforeCreateStaff } from "../validateBeforeCreateStaff/validateBeforeCreateStaff"
import { GET_DB } from "~/config/mongodb"

export const createNewStaff = async (newStaff) => {
    try {
        console.log("newStaff", newStaff)
        const valiData = await validateBeforeCreateStaff(newStaff)
        console.log("valiData", valiData)
        const dataToInsert = {
            ...valiData,
            userId: new ObjectId(valiData.userId),
            restaurantId: new ObjectId(valiData.restaurantId),
            createdAt: new Date()
        }
        const exist = GET_DB()
            .collection(STAFF_RESTAURANT_COLLECTION_NAME)
            .insertOne(dataToInsert)
        return exist
    } catch (error) {
        throw new Error(error)
    }
}