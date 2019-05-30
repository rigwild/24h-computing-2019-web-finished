import { shortenCall, API_ROUTES } from './_utils'
import { getOrders } from './User'

export const createOrder = (orderId, newProgressState) =>
  shortenCall(API_ROUTES.createOrders, { newProgressState })

export { getOrders }
