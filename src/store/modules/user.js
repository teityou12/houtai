
import { getToken, setToken, removeToken } from '@/utils/auth.js'
import { login } from '@/api/user'
// 状态

const state = {
  token: getToken() // 设置token为共享状态
}
const mutations = {
  setToken (state, token) {
    state.token = token // 将数据设置给vuex
    // 同步给缓存
    setToken(token)
  },
  removeToken (state) {
    state.token = null // 将vuex的数据置空
    removeToken() // 同步到缓存
  }

}
const actions = {
  async login (context, data) {
    const result = await login(data)

    context.commit('setToken', result.token)
  },
  logout (context) {
    // 删除token
    context.commit('removeToken')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
