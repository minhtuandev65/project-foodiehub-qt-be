import { models } from '~/models'

export const bookTable = async (data) => {
    return await models.bookTable.BOOK_TABLE_COLLECTION_SCHEMA.validateAsync(
        data,
        {
            abortEarly: false
        }
    )
}
