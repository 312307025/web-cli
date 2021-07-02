import { homeRouter } from './homeRouter'
import { operationRouter } from './operationRouter'

export default [
  ...homeRouter,
  ...operationRouter,
]
