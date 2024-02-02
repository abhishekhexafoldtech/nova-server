import request from '@/utils/request'

export function getAdminDetails(id) {
  return request({
    url: `/order/admin/order/${id}/`,
    method: 'get',
  })
}
