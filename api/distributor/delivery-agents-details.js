import request from '@/utils/request';


export function fetchDeliveryAgentDetails(id, query) {
    return request({
        url: `/nova_auth/admin/company_employee/${id}`,
        method: 'get',
        params: query
    })
}