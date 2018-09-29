import request from '@/utils/request'

export function ossObjHandler(data) {
  return request({
    url: '/project/signature?dir=tokenExchange',
    method: 'get'
  })
}
// 获取地址使用情况
export function addrCount() {
  return request({
    url: '/dashbord/account/count',
    method: 'get'
  })
}

// 地址使用情况表格
export function addrTable(data) {
  return request({
    url: `/dashbord/account${data}`,
    method: 'get'
  })
}
// 充提记录查询
export function RWRecord(data) {
  return request({
    url: `/dashbord/transaction${data}`,
    method: 'get'
  })
}

// 导出签名
export function importSign(data) {
  return request({
    url: '/dashbord/export/sign',
    method: 'get'
  })
}

// 修改状态
export function review(data) {
  return request({
    url: `/dashbord/transaction/${data.id}/${data.status}`,
    method: 'put'
  })
}

// 同意所有
export function agreeAll(data) {
  return request({
    url: '/dashbord/agree',
    method: 'put'
  })
}
// 充提数据统计
export function RWDataStatistics(data) {
  return request({
    url: `/dashbord/transaction/count${data}`,
    method: 'get'
  })
}
// 获取资产统计
export function assets(data) {
  return request({
    url: `/dashbord/balance${data}`,
    method: 'get'
  })
}
// 商户提现
export function withdraw(data) {
  return request({
    url: '/dashbord/withdraw',
    method: 'post',
    data
  })
}
