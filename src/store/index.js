import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    connected: false,
    userid: ''
  },
  plugins: [
    createPersistedState({
      paths: ['connected', 'userid'],
      getState: (key) => Cookies.getJSON(key),
      setState: (key, state) => Cookies.set(key, state, {expires: 365})
    })
  ],
  mutations: {
    logout (state) {
      state.connected = false
      state.userid = ''
    },
    login (state, id) {
      state.connected = true
      state.userid = id
    }
  },
  getters: {
    doesConnected (state) {
      return state.connected
    },
    getUserId (state) {
      return state.userid
    }
  }
})
