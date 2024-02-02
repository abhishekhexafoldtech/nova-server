import request from '@/utils/request'

export function adminSendCred(id, data) {
    return request({
      url: `/nova_auth/admin/${id}/send_creds`,
      method: 'post',
      data
    })
  }
  





