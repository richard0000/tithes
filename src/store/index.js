import Vue from 'vue'  
import Vuex from 'vuex'

// imports of AJAX functions go here
import { fetchTithes, fetchTithe } from '@/api'

Vue.use(Vuex)

const state = {  
  // single source of data
  tithes: [],
  currentTithe: {}
}

const actions = {  
  // asynchronous operations
  loadTithes(context) {
    return fetchTithes()
      .then((response) => context.commit('setTithes', { tithes: response.data }))
  },
  loadTithe(context, { id }) {
    return fetchTithe(id)
      .then((response) => context.commit('setTithe', { tithe: response.data }))
  }
}

const mutations = {  
  // isolated data mutations
  setTithes(state, payload) {
    state.tithes = payload.tithes.data
  },
  setTithe(state, payload) {
    state.currentTithe = payload.tithe.data
  }
}

const getters = {  
  // reusable data accessors
}

const store = new Vuex.Store({  
  state,
  actions,
  mutations,
  getters
})

export default store  