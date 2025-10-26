import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongo/mongodb'
import { helpers } from '~/helpers'

export const detail = async (restaurantId) => {
    try {
        const pipeline = [
            // 1) Lọc đúng nhà hàng, còn hoạt động
            {
                $match: {
                    _destroy: false,
                    _id: new ObjectId(restaurantId)
                }
            },

            // 2) Lookup menus theo restaurantId
            {
                $lookup: {
                    from: helpers.mongo.collectionName.MENU, // "menu_restaurant"
                    let: { rid: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$restaurantId', '$$rid'] },
                                        { $eq: ['$_destroy', false] }
                                    ]
                                }
                            }
                        },
                        {
                            $project: {
                                _id: 1,
                                name: 1,
                                description: 1,
                                // price: 1,
                                imageURL: 1,
                                quantity: 1,
                                category: 1,
                                isAvailable: 1,
                                createdAt: 1,
                                updatedAt: 1
                            }
                        },
                        { $sort: { createdAt: -1 } } // tùy chọn
                    ],
                    as: 'menus'
                }
            },

            // 3) Lookup tables theo restaurantId
            {
                $lookup: {
                    from: helpers.mongo.collectionName.TABLE, // "table_restaurant"
                    let: { rid: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$restaurantId', '$$rid'] },
                                        { $eq: ['$_destroy', false] }
                                    ]
                                }
                            }
                        },
                        {
                            $project: {
                                _id: 1,
                                /* tableNo: 1, // số bàn (đổi theo schema của bạn)
                                capacity: 1, // sức chứa
                                status: 1, // ví dụ: 'AVAILABLE' | 'OCCUPIED' | 'RESERVED' */
                                name: 1,
                                categories: 1,
                                description: 1,
                                imageURL: 1,
                                createdAt: 1,
                                updatedAt: 1
                            }
                        },
                        { $sort: { tableNo: 1 } } // tùy chọn
                    ],
                    as: 'tables'
                }
            },

            /* // 4) Tính các chỉ số tổng hợp (không bắt buộc)
            {
                $addFields: {
                    menuCount: { $size: { $ifNull: ['$menus', []] } },
                    tableCount: { $size: { $ifNull: ['$tables', []] } },
                    availableTableCount: {
                        $size: {
                            $filter: {
                                input: { $ifNull: ['$tables', []] },
                                as: 't',
                                cond: { $eq: ['$$t.status', 'AVAILABLE'] } // đổi theo enum thực tế
                            }
                        }
                    }
                }
            }, */

            // 5) Project các field của restaurant + 2 mảng (menus, tables) + chỉ số
            {
                $project: {
                    logoURL: 1,
                    name: 1,
                    description: 1,
                    address: 1,
                    email: 1,
                    phone: 1,
                    lat: 1,
                    lng: 1,
                    openTime: 1,
                    closeTime: 1,
                    businessCertificateFileKey: 1,
                    businessCertificateImageKey: 1,
                    openDays: 1,
                    averageCostPerPerson: 1,
                    paymentMethods: 1,
                    isOpen: 1,
                    isPreOrderAvailable: 1,
                    ratingAverage: 1,
                    ratingQuantity: 1,
                    reviewCount: 1,
                    isEmployeeRecruitment: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    status: 1,

                    menus: 1,
                    tables: 1,
                    menuCount: 1,
                    tableCount: 1,
                    availableTableCount: 1
                }
            }
        ]

        const restaurantDetail = await GET_DB()
            .collection(helpers.mongo.collectionName.RESTAURANTS)
            .aggregate(pipeline)
            .toArray()

        return restaurantDetail[0] || null
    } catch (error) {
        throw new Error(error)
    }
}
