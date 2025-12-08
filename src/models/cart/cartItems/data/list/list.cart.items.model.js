import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'
import { pagingSkipValue } from '~/utils/algorithms'

export const list = async (cartId, filter = {}) => {
    try {
        const { sort, status, page = 1, limit = 30 } = filter
        const skip = pagingSkipValue(page, limit)
        let matchStage = {
            _destroy: false,
            cartId: new ObjectId(cartId)
        }
        const pipeline = [
            { $match: matchStage },
            {
                $project: {
                    imageURL: 1,
                    name: 1,
                    quantity: 1,
                    price: 1,
                    menuId: 1
                }
            },
            { $skip: skip },
            { $limit: parseInt(limit) }
        ]

        const countPipeline = [{ $match: matchStage }, { $count: 'total' }]

        const [countResult] = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.CART_ITEMS)
            .aggregate(countPipeline)
            .toArray()

        const total = countResult ? countResult.total : 0

        const cartItemsList = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.CART_ITEMS)
            .aggregate(pipeline)
            .toArray()

        return {
            cartItemsList,
            total,
            page: parseInt(page),
            limit: parseInt(limit)
        }
    } catch (error) {
        throw new Error(error)
    }
}
