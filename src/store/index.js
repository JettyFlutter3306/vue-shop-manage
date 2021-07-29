import Vue from 'vue'
import VueX from 'vuex'
import menus from "@/store/modules/menus";

Vue.use(VueX)

const store = new VueX.Store({
  state: {
    count: 0,
    loading: false
  },
  getters: {
    getLoading(state) {
      return state.loading
    }
  },
  /**
   * 参数列表：{commit, state}
   * state指的是state数据
   * commit调用mutations的方法
   * name就是调用此方法时要传的参数
   */
  actions: {
    setLoading({commit, state}, loading) {
      commit("setLoading", loading)
    }

  },
  mutations: {
    increment(state){
      state.count++;
    },
    setLoading(state, loading) {
      state.loading = loading
    }

  },
  modules: {
   menus
  }

})

export default store

