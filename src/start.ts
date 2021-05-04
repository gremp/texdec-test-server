process.env.TZ = 'UTC'
require('source-map-support').install()
require('dotenv').config()
Error.stackTraceLimit = Infinity

export { app } from './server'
