export const delay = ms => new Promise(res => setTimeout(res, ms))

// Build an HTTP URI
export const buildURI = (host, port, route = '') => `//${host}:${port}${route}`
