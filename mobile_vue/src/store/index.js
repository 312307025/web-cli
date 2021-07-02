import Vue from 'vue'
import Vuex from 'vuex'

import globel from './globel.js'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    globel,
  },
  getters,
})
