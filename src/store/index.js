import Vue from 'vue'
import Vuex from 'vuex'

// imports of AJAX functions go here
import { fetchTithes, fetchTithe, fetchPDFTithes, destroyTithe, fetchMembers, fetchMember, fetchMemberTithes, createTithe, createMember, fetchAvailableDates, fetchAvailableDatesForUser } from '@/api'

Vue.use(Vuex)

const state = {
  // single source of data
  tithes: [],
  currentTithe: {},
  currentMember: {},
  selectedDate: {
      year: {
          id: null,
          name: null
      },
      month: {
          id: null,
          name: null
      }
  },
  selectedMember: {},
  selectedMemberTithes: {},
  availableDates: {},
  availableDatesForUser: {}
}

const actions = {
  // asynchronous operations
  loadAvailableDates(context) {
    return fetchAvailableDates()
      .then((response) => context.commit('setAvailableDates', { dates: response.data }))
  },
  loadAvailableDatesForUser(context, { id }) {
    return fetchAvailableDatesForUser(id)
      .then((response) => context.commit('setAvailableDatesForUser', { dates: response.data }))
  },
  loadTithes(context, {date}) {
    return fetchTithes(date)
      .then((response) => context.commit('setTithes', { tithes: response.data }))
  },
  loadTithe(context, { id }) {
    return fetchTithe(id)
      .then((response) => context.commit('setTithe', { tithe: response.data }))
  },
  loadPDFTithes(context, {date}) {
    return fetchPDFTithes(date)
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
  loadMemberTithes(context, { id, date }) {
    return fetchMemberTithes(id, date)
      .then((response) => context.commit('setMemberTithes', { tithes: response.data }))
  },
  prepareSelectedYear(context, { year }) {
    return context.commit('setSelectedYear', { year: year })
  },
  prepareSelectedMonth(context, { month }) {
    return context.commit('setSelectedMonth', { month: month })
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
  setAvailableDates(state, payload) {
    state.availableDates.months = payload.dates.data.months;
    state.availableDates.years = payload.dates.data.years;
  },
  setAvailableDatesForUser(state, payload) {
    state.availableDatesForUser.months = payload.dates.data.months;
    state.availableDatesForUser.years = payload.dates.data.years;
  },
  setTithes(state, payload) {
    state.tithes = payload.tithes.data;
  },
  setTithe(state, payload) {
    state.currentTithe = payload.tithe.data;
  },
  setMembers(state, payload) {
    state.members = payload.members.data;
  },
  setMember(state, payload) {
    state.selectedMember = payload.member.data;
  },
  setMemberTithes(state, payload) {
    state.selectedMemberTithes = payload.tithes.data;
  },
  unsetSelectedMember() {
    state.selectedMember = {};
  },
  setSelectedYear(state, payload) {
    state.selectedDate.year.id = payload.year;
  },
  setSelectedMonth(state, payload) {
    state.selectedDate.month.id = payload.month;
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
