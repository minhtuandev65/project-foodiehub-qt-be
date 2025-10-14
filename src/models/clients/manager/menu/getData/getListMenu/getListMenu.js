import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { MENU_RESTAURANT_COLLECTION_NAME } from '~/helpers'
import { pagingSkipValue } from '~/utils/algorithms'

export const getListMenuForManager = async (restaurantId, filter = {}) => {
    try {
        const { sort, status, page = 1, limit = 30 } = filter
        const skip = pagingSkipValue(page, limit)
        let matchStage = {
            _destroy: false,
            restaurantId: new ObjectId(restaurantId)
        }
        const pipeline = [
            { $match: matchStage },
            {
                $project: {
                    imageURL: 1,
                    name: 1,
                    categories: 1,
                    createdAt: 1,
                    quantity: 1
                }
            },
            { $skip: skip },
            { $limit: parseInt(limit) }
        ]

        const countPipeline = [{ $match: matchStage }, { $count: 'total' }]

        const [countResult] = await GET_DB()
            .collection(MENU_RESTAURANT_COLLECTION_NAME)
            .aggregate(countPipeline)
            .toArray()

        const total = countResult ? countResult.total : 0

        const menuList = await GET_DB()
            .collection(MENU_RESTAURANT_COLLECTION_NAME)
            .aggregate(pipeline)
            .toArray()

        return {
            menuList,
            total,
            page: parseInt(page),
            limit: parseInt(limit)
        }
    } catch (error) {
        throw new Error(error)
    }
}
