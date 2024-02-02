import request from '@/utils/request'


export function getList(query) {
  return request({
    url: '/nova_auth/admin/',
    method: 'get',
    params: query
  })
}


export function addNewAdmin(data) {
  return request({
    url: '/nova_auth/admin/',
    method: 'post',
    data
  })
}

export function getAdminProfile(id){
  return request({
    url: `/nova_auth/admin/${id}/profile`,
    method: "get",
  })
}

export function adminResetPassword(id,data){
  return request({
    url: `/admin/${id}/reset_password`,
    method:'put',
    data
  })
}

export function destroy(id) {
  return request({
    url: `/nova_auth/admin/${id}`,
    method: 'delete'
  })
}