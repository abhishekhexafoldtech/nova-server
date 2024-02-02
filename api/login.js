import request from '@/utils/request'



export function loginByWeb(data) {
  return request({
    url: '/nova_auth/admin/login',
    method: 'post',
    data
  })
}

export function logoutByWeb(data) {
  return request({
    url: '/nova_auth/logout',
    method: 'post',
    data
  })
}

export function getUserInfo(query) {
  return request({
    url: 'nova_auth/user-info',
    method: 'get',
    params: query
  })
}





