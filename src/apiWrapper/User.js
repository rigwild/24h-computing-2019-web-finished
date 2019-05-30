import { isLoggedIn, setToken, delToken, shortenCall, API_ROUTES } from './_utils'

/**
 * Logout from the API (It just destroy the JWT locally!!)
 * @returns {void}
 */
export const logout = () => delToken()

/**
 * Login to the API
 * @param {String} username The username of the user
 * @param {String} password The password of the user
 * @returns {Promise<Object>} The login object (some data on the user)
 * @throws Invalid username or password
 */
export const login = async (username, password) => {
  if (isLoggedIn()) throw new Error('You are already logged in.')

  const data = await shortenCall(API_ROUTES.login, { username, password })
  setToken(data.token)
  return data
}

export const register = (username, password, role, street, postalCode, countryCode, phone, city) => {
  if (isLoggedIn()) throw new Error('You are already logged in.')
  return shortenCall(API_ROUTES.register, {
    username,
    password,
    role,
    address: {
      street,
      postalCode,
      countryCode,
      city
    },
    phone
  }
  )
}

/**
 * Get profile data
 * @param {String} id User's id to get profile data from
 * @returns {Promise<Object>} The profile data of the user
 * @throws The user was not found
 */
export const profile = id => {
  if (!isLoggedIn()) throw new Error('You need to be logged in.')
  return shortenCall(API_ROUTES.profile(id))
}

export const getOrders = () => shortenCall(API_ROUTES.getOrders)
