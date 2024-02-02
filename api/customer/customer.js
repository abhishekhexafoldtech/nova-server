import request from '@/utils/request'
export function Customer(type,id,optional,data){
    return request({
        url: (id && optional) ? `/nova_auth/admin/customer/${id}?tab=${optional}` : id ? `/nova_auth/admin/customer/${id}` : `/nova_auth/admin/customer/`,
        method: type,
        data: data ? data : ""
    })
}

export function getCustomerList(type,page,perpage){
    return request({
        url:`/nova_auth/admin/customer/?page=${page}&size=${perpage ? perpage : "10"}`,
        method: type,
    })
}

export function CustomerAddress(type,id,data){
    return request({
        url: `/location/customer/${id}/address?is_default=true`,
        method: type,
        data: data ? data : ""
    })
}


