'use strict'

import mongoose, { Schema } from 'mongoose'

/**
 * @type {mongoose.Model}
 */
const User = mongoose.model('User', new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    select: false,
    required: true
  },
  joinDate: {
    type: Date,
    default: () => new Date()
  },
  address: {
    street: {
      number: { type: String, required: true },
      name: { type: String, required: true }
    },
    postalCode: { type: String, required: true },
    city: { type: String, required: true },
    countryCode: { type: String, required: true }
  },
  phone: { type: String, required: true }
}, { discriminatorKey: 'role', collection: 'users' }))

export default User
