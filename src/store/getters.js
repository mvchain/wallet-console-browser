const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  ossObj: state => state.project.ossObj
}
export default getters
