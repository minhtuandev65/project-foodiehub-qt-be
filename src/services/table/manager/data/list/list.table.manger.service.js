import { models } from "~/models";

export const list=async(restaurantId, filter)=>{
    const {tableList, total, page, limit} = await models.table.manager.data.list(restaurantId)

    const listTable= tableList.map((item)=>{
        return {
            ...item, 
             createdAt: new Date(item.createdAt).toLocaleDateString('vi-VN')
        }
    })
    return {
        ...listTable,
         total, 
         page, 
         limit
    }
}