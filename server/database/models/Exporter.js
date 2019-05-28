'use strict'

import { Schema } from 'mongoose'
import User from './User'
import { coffeeType, integerOnly } from './_utils'

/**
 * @type {mongoose.Model}
 */
const Exporter = User.discriminator('Exporter', new Schema({
  offers: [
    {
      active: { type: Boolean, default: true },
      coffeeType,
      originCountryCode: { type: String, required: true },
      orderable: { ...integerOnly, required: true },
      real: { ...integerOnly, required: true },
      bagPrice: { ...integerOnly, required: true }
    }
  ],
  orders: [
    {
      progress: {
        type: String,
        enum: ['pendingValidation', 'preparation', 'sentPending', 'sent', 'finished', 'cancelled'],
        required: false,
        default: 'pendingValidation'
      },
      startedDate: {
        type: Date,
        default: () => new Date()
      },
      coffeeType,
      originCountryCode: { type: String, required: true },
      quantity: { ...integerOnly, required: true },
      importerId: { type: String, required: true },
      fromOfferId: { type: String, required: true }
    }
  ]
}))

export default Exporter
