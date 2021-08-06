export default {
  state: {
    userId: ''
  },
  getters: {
    getUserId(state) {
      return state.userId
    }
  },
  mutations: {
    setUserId(state, userId) {
      state.userId = userId
    }
  },
  actions: {
    setUserId({commit, state}, id) {
      commit("setUserId", id)
    }
  }
}
