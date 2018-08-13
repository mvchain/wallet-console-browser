import { ossObjHandler } from '@/api/Home'

const Project = {
  state: {
    ossObj: {}
  },
  mutations: {
    SET_OSSOBJ: (state, ossObj) => {
      state.ossObj = ossObj
    }
  },
  actions: {
    getOssObj: ({ commit, state }) => {
      return new Promise((resolve, reject) => {
        ossObjHandler().then(res => {
          commit('SET_OSSOBJ', res.data)
          resolve(res.data)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default Project
