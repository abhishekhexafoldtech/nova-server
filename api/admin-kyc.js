import request from '@/utils/request'



// export function getRoleDropdownList(query) {
//   return request({
//     url: '/roles/',
//     method: 'get',
//     params: query
//   })
// }

// export function getList(query) {
//   return request({
//     url: '/roles/',
//     method: 'get',
//     params: query
//   })
// }

// export function store(data) {
//   return request({
//     url: '/roles/',
//     method: 'post',
//     data
//   })
// }

// export function show(id) {
//   return request({
//     url: '/roles/',
//     method: 'get'
//   })
// }

export function edit(id) {
  return request({
    url: `/nova_auth/admin/${id}`,
    method: 'get'
  })
}

export function update(id, data) {
  return request({
    url: `/nova_auth/admin/${id}`,
    method: 'patch',
    data,
  })
}

export function storeAddress(data) {
  return request({
    url: '/location/admin/address',
    method: 'post',
    data
  })
}

// export function destroy(id) {
//   return request({
//     url: `/roles/${id}`,
//     method: 'delete'
//   })
// }