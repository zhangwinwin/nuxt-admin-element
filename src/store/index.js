import * as Types from './mutationsType'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export const state = () => ({
  // 这两个用于client side的使用, 又放cookie里是为了刷新时状态不丢失
  hostTableList: [],
  paginationConfig: {},
  hostUrl: '/api/hostList/0'
})

//  mutation 必须同步执行
export const mutations = {
  [Types.GETHOSTTABLELIST] (state, value) {
    state.hostTableList = value
  },
  [Types.SETPAGINATIONCONFIG] (state, value) {
    state.paginationConfig = value
  },
  [Types.SETHOSTURL] (state, value) {
    state.hostUrl = value
  }
}

// Action 提交的是 mutation，而不是直接变更状态
// Action 可以包含任意异步操作
export const actions = {
  setHostTableList ({commit}, data) {
    commit(Types.GETHOSTTABLELIST, data)
  },
  setPaginationConfig ({commit}, data) {
    commit(Types.SETPAGINATIONCONFIG, data)
  },
  setHostUrl ({commit}, data) {
    commit(Types.SETHOSTURL, data)
  }
}

