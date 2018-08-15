import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/dashbord',
    method: 'post',
    data
  })
}
export function refreshToken(data) {
  return request({
    url: '/dashbord/refresh',
    method: 'post'
  })
}
