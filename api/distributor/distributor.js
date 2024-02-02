import request from '@/utils/request';


export function fetchList(query) {
    return request({
        url: '/nova_auth/admin/company/?page=1&size=12',
        method: 'get',
        params: query
    })
}