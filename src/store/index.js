import Vue from 'vue'  
import Vuex from 'vuex'

// imports of AJAX functions go here
import { fetchTithes, fetchTithe, destroyTithe, fetchMembers, fetchMember, createTithe, createMember } from '@/api'

Vue.use(Vuex)

const state = {  
  // single source of data
  tithes: [],
  currentTithe: {},
  selectedMember: {}
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
  },
  deleteTithe(context, { id, router }) {
    return destroyTithe(id)
  },
  loadMembers(context) {
    return fetchMembers()
      .then((response) => context.commit('setMembers', { members: response.data }))
  },
  loadMember(context, { id }) {
    return fetchMember(id)
      .then((response) => context.commit('setMember', { member: response.data }))
  },
  pushNewTithe(context, { user_id, amount, date, router}) {
    return createTithe(user_id, amount, date)
  },
  pushNewMember(context, { member }) {
    return createMember(member)
      .then((response) => context.commit('setMember', { member: response.data }))
  },
  quitSelectedMember(context) {
    return context.commit('unsetSelectedMember')
  }
}

const mutations = {  
  // isolated data mutations
  setTithes(state, payload) {
    state.tithes = payload.tithes.data
  },
  setTithe(state, payload) {
    state.currentTithe = payload.tithe.data
  },
  setMembers(state, payload) {
    state.members = payload.members.data
  },
  setMember(state, payload) {
    state.selectedMember = payload.member.data
  },
  unsetSelectedMember() {
    state.selectedMember = {}
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