import request from '@/utils/request'



export function getRoleDropdownList(query) {
  return request({
    url: '/nova_auth/roles/',
    method: 'get',
    params: query
  })
}

export function getList(query) {
  return request({
    url: '/nova_auth/roles/',
    method: 'get',
    params: query
  })
}

export function store(data) {
  return request({
    url: '/nova_auth/roles/',
    method: 'post',
    data
  })
}

export function show(id) {
  return request({
    url: '/nova_auth/roles/',
    method: 'get'
  })
}

export function edit(id) {
  return request({
    url: `/nova_auth/roles/${id}`,
    method: 'get'
  })
}

export function update(id, data) {
  return request({
    url: `/nova_auth/roles/${id}`,
    method: 'patch',
    data,
  })
}

export function destroy(id) {
  return request({
    url: `/nova_auth/roles/${id}`,
    method: 'delete'
  })
}