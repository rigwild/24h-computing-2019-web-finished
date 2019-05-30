import { apiPrefix, serverPort } from '../../config'
import { buildURI } from '../functions'

const host = 'localhost'
const tokenStorageKey = 'login-token'

export const API_PREFIX = apiPrefix
export const API_ROUTES = {
  ping: `${API_PREFIX}/`,
  login: `${API_PREFIX}/login`,
  register: `${API_PREFIX}/register`,
  profile: id => `${API_PREFIX}/profile${id ? `/${id}` : ''}`,

  countries: `${API_PREFIX}/countries`,

  offers: `${API_PREFIX}/exporter/offers`,

  getOrders: `${API_PREFIX}/exporter/orders`,
  createOrder: `${API_PREFIX}/exporter/orders`
}

export const setToken = token => localStorage.setItem(tokenStorageKey, token)
export const delToken = () => localStorage.removeItem(tokenStorageKey)
export const getToken = () => localStorage.getItem(tokenStorageKey)
export const isLoggedIn = () => !!getToken()

/**
 * Make a call to the API. Extracts the `data` property if call was successful.
 * @param {String} URI The API route
 * @param {Object} options Fetch options object
 * @returns {Promise<Object>} The API's response
 */
export const API_CALL = async (URI, options = {}) => {
  if (!options.headers) options.headers = {}

  // Set JSON Content-Type
  if (!options.headers['Content-Type'])
    options.headers['Content-Type'] = 'application/json'

  // Set login token if available
  const token = getToken()
  if (token) options.headers.authorization = `Bearer ${token}`

  // Do the actual request, extracting the `data` property from the response
  const { data } = await fetch(URI, options)
    .then(async res => {
      // Add the JSON output to the HTTP response instance
      res.json = await res.json()
      return res
    })
    .then(res => {
      if (!res.ok) throw new Error(`${res.json.message}${res.json.data ? ' ' + res.json.data : ''}`)
      return res.json
    })
  return data
}

export const shortenCall = (route, body, method = body ? 'POST' : 'GET') => API_CALL(buildURI(host, serverPort, route), {
  method,
  body: body ? JSON.stringify(body) : undefined
})


export { serverPort, buildURI }
