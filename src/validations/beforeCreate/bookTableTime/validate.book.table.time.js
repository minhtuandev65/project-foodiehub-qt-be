import { models } from '~/models'

export const bookTableTime = async (data) => {
    return await models.bookTableTime.BOOK_TABLE_TIME_COLLECTION_SCHEMA.validateAsync(
        data,
        {
            abortEarly: false
        }
    )
}
