import { models } from "~/models";

export const restaurant = async (data) => {
	return await models.restaurant.RESTAURANT_COLLECTION_SCHEMA.validateAsync(
		data,
		{
			abortEarly: false,
		}
	);
};