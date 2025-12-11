import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'
import { pagingSkipValue } from '~/utils/algorithms'

export const list = async (restaurantId, filter = {}) => {
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
                    quantity: 1,
                    price: 1,
                    description: 1
                }
            },
            { $skip: skip },
            { $limit: parseInt(limit) }
        ]

        const countPipeline = [{ $match: matchStage }, { $count: 'total' }]

        const [countResult] = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.MENU)
            .aggregate(countPipeline)
            .toArray()

        const total = countResult ? countResult.total : 0

        const menuList = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.MENU)
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
