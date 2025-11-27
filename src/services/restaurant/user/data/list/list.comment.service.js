import { models } from '~/models'

export const listComment  = async (userId, filter) => {
    const result = await models.restaurant.user.data.listComment(filter)

    return result
}
