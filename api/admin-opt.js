import request from '@/utils/request'

export function getOtp(query) {
  return request({
    url: '/nova_auth/admin/send_otp',
    method: 'get',
    params: query
  })
}

export function verifyOtp(data) {
    return request({
      url: '/nova_auth/admin/verify_otp',
      method: 'post',
      data
    })
  }
  





