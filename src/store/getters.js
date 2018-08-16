const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  ossObj: state => state.project.ossObj,
  addressCount: state => state.project.addressCount,
  addressTable: state => state.project.addressTable,
  recordList: state => state.project.recordList,
  dataList: state => state.project.dataList,
  assetsData: state => state.project.assetsData,
  avatar: state => state.user.avatar
}
export default getters
