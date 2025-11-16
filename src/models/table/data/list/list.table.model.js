import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'
import { pagingSkipValue } from '~/utils/algorithms'

export const list = async (restaurantId, filter = {}) => {
    try {
        const { sort, status, page = 1, limit = 30 } = filter
        const skip = pagingSkipValue(page, limit)

        const pipeline = [
            {
                $match: {
                    _destroy: false,
                    restaurantId: new ObjectId(restaurantId)
                }
            },
            {
                $lookup: {
                    from: helpers.mongo.collectionName.BOOK_TABLE,
                    let: { rid: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ['$tableId', '$$rid']
                                },
                                _destroy: false
                            }
                        },
                        { $sort: { createdAt: -1 } },
                        { $limit: 1 },
                        {
                            $project: {
                                _id: 1,
                                userId: 1,
                                status: 1,
                                createdAt: 1,
                                updatedAt: 1
                            }
                        }
                    ],
                    as: 'booking' // mảng 0..1 phần tử
                }
            },
            // Lấy phần tử đầu tiên (nếu có) và ghi đè status
            {
                $addFields: {
                    currentBooking: { $first: '$booking' },
                    effectiveStatus: {
                        $ifNull: [{ $first: '$booking.status' }, '$status']
                    }
                }
            },
            {
                $project: {
                    imageURL: 1,
                    name: 1,
                    categories: 1,
                    status: '$effectiveStatus',
                    book_table: '$currentBooking',
                    createdAt: 1
                }
            },
            { $skip: skip },
            { $limit: parseInt(limit) }
        ]

        const countPipeline = [
            {
                $match: {
                    _destroy: false,
                    restaurantId: new ObjectId(restaurantId)
                }
            },
            { $count: 'total' }
        ]

        const [countResult] = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.TABLE)
            .aggregate(countPipeline)
            .toArray()

        const total = countResult ? countResult.total : 0

        const tableList = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.TABLE)
            .aggregate(pipeline)
            .toArray()

        return {
            tableList,
            total,
            page: parseInt(page),
            limit: parseInt(limit)
        }
    } catch (error) {
        throw new Error(error)
    }
}
