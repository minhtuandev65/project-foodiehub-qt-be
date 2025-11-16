export { RESTAURANT_COLLECTION_SCHEMA } from './model/restaurant.model'
export { RATING_RESTAURANT_COLLECTION_SCHEMA } from './model/rating.restaurant.models'
export { COMMENT_RESTAURANT_COLLECTION_SCHEMA } from './model/comment.restaurant.models'
import * as find from './find/index'
import * as manager from './manager/index'
import * as admin from './admin/index'
import * as user from './user/index'
export { manager, admin, find, user }
