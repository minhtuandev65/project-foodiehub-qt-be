import * as mongo from './mongo/mongodb'
import * as env from './env/environment'
import * as cors from './cors/cors'
import * as aws from './aws/awsS3'
export const config = {
    mongo,
    env,
    cors,
    aws
}
