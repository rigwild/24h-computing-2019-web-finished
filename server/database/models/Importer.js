'use strict'

import { Schema } from 'mongoose'
import User from './User'

/**
 * @type {mongoose.Model}
 */
const Importer = User.discriminator('Importer', new Schema({}))

export default Importer
