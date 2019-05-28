'use strict'

import express from 'express'
import session from './session'
import countries from './countries'
import user from './user'
import exporter from './exporter'
import importer from './importer'

const router = express.Router()

router.use('/countries', countries)
router.use('/', session)
router.use('/', user)
router.use('/exporter', exporter)
router.use('/importer', importer)

export default router
