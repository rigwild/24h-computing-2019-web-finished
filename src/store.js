import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import router from './router'
import apiWrapper from '@/apiWrapper'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false,
    userData: {
      username: null,
      role: null
    },
    countries: null
  },

  actions: {
    async login({ commit }, { username, password }) {
      const data = await apiWrapper.User.login(username, password)
      commit('setLoggedIn', data)
      router.push({ name: 'Home' })
    },

    logout({ commit }) {
      apiWrapper.User.logout()
      commit('setLoggedOut')
      router.push({ name: 'Login' })
    },

    async getCountries({ commit, state }) {
      if (state.countries) return state.countries
      const countries = (await apiWrapper.Data.countries()).sort((a, b) => b.coffee_quantity - a.coffee_quantity)
      commit('setCountries', countries)
      return countries
    }
  },

  mutations: {
    setLoggedIn(state, { username, role }) {
      state.loggedIn = true
      state.userData = {
        username,
        role
      }
    },
    setLoggedOut(state) {
      state.loggedIn = false
      state.userData = {
        username: null,
        role: null
      }
    },

    setCountries(state, countries) {
      state.countries = countries
    }
  },

  getters: {
    areCountriesLoaded(state) {
      return !!state.countries
    }
  },

  plugins: [createPersistedState()]
})
