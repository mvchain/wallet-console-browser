const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  ossObj: state => state.project.ossObj,
  avatar: state => state.user.avatar
}
export default getters
