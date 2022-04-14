import Vue from 'vue'
import VueX from 'vuex'
import menus from "@/store/modules/menus"
import user from "@/store/modules/user"

Vue.use(VueX)

const store = new VueX.Store({
  state: {
    count: 0,
    loading: false
  },
  mutations: {
    increment(state) {
      state.count++
    },
    setLoading(state, loading) {
      state.loading = loading
    }

  },
  /**
   * 参数列表：{commit, state}
   * state指的是state数据
   * commit调用mutations的方法
   * name就是调用此方法时要传的参数
   */
  actions: {
    setLoading({ commit, state }, loading) {
      commit("setLoading", loading)
    }
  },
  getters: {
    getLoading(state) {
      return state.loading
    }
  },
  modules: {
    menus,
    user
  }

})

export default store

