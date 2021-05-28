import Vue from 'vue'
import VueX from 'vuex'

Vue.use(VueX)

const store = new VueX.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state){
      state.count++;
    }
  },
  getters: {

  },
  actions: {

  }

})

export default store

