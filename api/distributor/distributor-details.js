import request from '@/utils/request';


export function fetchBusinessDetails(id, query) {
    return request({
        url: `/nova_auth/admin/company/${id}`,
        method: 'get',
        params: query
    })
}