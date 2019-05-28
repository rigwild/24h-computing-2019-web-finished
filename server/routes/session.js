'use strict'

import express from 'express'
import boom from '@hapi/boom'

import { asyncMiddleware, checkRequiredParameters } from '../functions'
import { checkNoJwt } from '../middlewares/auth'
import db from '../database/controllers'

const router = express.Router()

router.post('/register', checkNoJwt, asyncMiddleware(async (req, res) => {
  // Check the request contains all the required parameters
  checkRequiredParameters(['username', 'password', 'role', 'address', 'phone'], req.body)

  const { username, password, role, address, phone } = req.body

  const userObj = await db.User.register(username, password, role, address, phone)
    .catch(err => {
      throw boom.boomify(err, { statusCode: 400 })
    })

  res.json({
    data: userObj
  })
}))


router.post('/login', checkNoJwt, asyncMiddleware(async (req, res) => {
  // Check the request contains all the required parameters
  checkRequiredParameters(['username', 'password'], req.body)

  const { username, password } = req.body

  const loginObj = await db.User.login(username, password)
    .catch(err => {
      throw boom.boomify(err, { statusCode: 401 })
    })

  res.json({
    data: {
      ...loginObj
    }
  })
}))

export default router
