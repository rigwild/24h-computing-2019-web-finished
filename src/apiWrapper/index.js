import { logout, login, register, profile } from './User'
import { countries } from './Data'
import { getOffers, createOffer, getOrders } from './Exporter'
import { createOrder } from './Importer'

export default {
  User: {
    login,
    logout,
    register,
    profile
  },
  Data: {
    countries
  },
  Exporter: {
    getOffers,
    createOffer,
    getOrders
  },
  Importer: {
    createOrder
  }
}
