import request from '@/utils/request'


export function getList(query) {
  return request({
    url: '/order/admin/orders',
    method: 'get',
    params: query
  })
}
