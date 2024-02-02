import request from "@/utils/request";

export function getEmployee(id,params){
    return request({
        url: `/nova_auth/admin/company_employee/${id}?${params}`,
        method: 'get',
      })
}