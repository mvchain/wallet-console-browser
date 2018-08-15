import { ossObjHandler, addrCount, addrTable, RWRecord, importSign, review, agreeAll } from '@/api/Home'

const Project = {
  state: {
    ossObj: {},
    addressCount: {},
    addressTable: {},
    recordList: {}
  },
  mutations: {
    SET_OSSOBJ: (state, ossObj) => {
      state.ossObj = ossObj
    },
    SET_ADDRESS: (state, addr) => {
      state.addressCount = addr
    },
    SET_ADDR_TABLE: (state, data) => {
      state.addressTable = data
    },
    SET_RECORD_LIST: (state, data) => {
      state.recordList = data
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
    },
    getAddrCount: ({ commit, state }) => {
      return new Promise((resolve, reject) => {
        addrCount().then(res => {
          commit('SET_ADDRESS', res.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getAddrTable: ({ commit, state }, payload) => {
      return new Promise((resolve, reject) => {
        addrTable(payload).then(res => {
          commit('SET_ADDR_TABLE', res.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getRecordList: ({ commit, state }, payload) => {
      return new Promise((resolve, reject) => {
        RWRecord(payload).then(res => {
          commit('SET_RECORD_LIST', res.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getSign: ({ commit, state }, payload) => {
      return new Promise((resolve, reject) => {
        importSign().then(res => {
          resolve(res.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getReview: ({ commit, state }, payload) => {
      return new Promise((resolve, reject) => {
        review(payload).then(res => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getAgreeAll: ({ commit, state }, payload) => {
      return new Promise((resolve, reject) => {
        agreeAll().then(res => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default Project
