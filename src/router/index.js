import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import store from '@/store'
import needLoggedOut from './needLoggedOut'

import needLoggedIn from './needLoggedIn'
import Exporter from './needLoggedIn/Exporter'
import Importer from './needLoggedIn/Importer'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    ...needLoggedIn,
    ...needLoggedOut
  ]
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = store.state.loggedIn === true
  const role = store.state.userData.role

  // Check if the route requires to be logged out
  if (needLoggedOut.find(x => x.name === to.name) && isLoggedIn)
    return next({ name: 'Home' })

  // Check if the route requires to be logged in
  if (needLoggedIn.find(x => x.name === to.name)) {
    if (!isLoggedIn)
      return next({ name: 'Login' })
    else if (Exporter.find(x => x.name === to.name) && role !== 'Exporter')
      return next({ name: 'Login' })
    else if (Importer.find(x => x.name === to.name) && role !== 'Importer')
      return next({ name: 'Login' })
  }

  next()
})

export default router
