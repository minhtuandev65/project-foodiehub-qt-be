import { createNewRestaurant } from "./createNewRestaurant/createNewRestaurant";
import { createNewStaffForRestaurant } from "./createNewStaffForRestaurant/createNewStaffForRestaurant";
import { findRestaurantById } from "./findRestaurantById/findRestaurantById";
import { getDetailRestaurantForManager } from "./getData/getDetailRestaurantForManager/getDetailRestaurantForManager";
import { getListCandidateProfile } from "./getData/getListCandidateProfile/getListCandidateProfile";
import { getListRestaurantForManager } from "./getData/getListRestaurantForManager/getListRestaurantForManager";
import { RESTAURANT_COLLECTION_SCHEMA } from "./restaurantModel/restaurantModel";
import { updateRestaurant } from "./update/updateRestaurant/updateRestaurant";
import { validateBeforeCreateRestaurant } from "./validateBeforeCreateRestaurant/validateBeforeCreateRestaurant";


export const restaurantModels = {
    RESTAURANT_COLLECTION_SCHEMA,
    validateBeforeCreateRestaurant,
    createNewRestaurant,
    updateRestaurant,
    findRestaurantById,
    getListRestaurantForManager,
    getDetailRestaurantForManager,
    getListCandidateProfile,
    createNewStaffForRestaurant
}
