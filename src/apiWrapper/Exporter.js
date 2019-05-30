import { shortenCall, API_ROUTES } from './_utils'
import { getOrders } from './User'

export const getOffers = () => shortenCall(API_ROUTES.offers)

export const createOffer = (coffeeType, originCountryCode, amount, bagPrice) =>
  shortenCall(API_ROUTES.offers, {
    coffeeType,
    originCountryCode,
    amount,
    bagPrice
  }, 'POST')

export { getOrders }
