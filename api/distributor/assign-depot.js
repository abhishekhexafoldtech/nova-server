import request from '@/utils/request';

// get al zone
export function getAllZone(query) {
    return request({
      url: '/location/zones',
      method: 'get',
      params: query
    })
  }

  //get all company location 
  export function getAllCompanyLocation(query) {
    return request({
      url: '/location/company_location',
      method: 'get',
      params: query
    })
  }

  // update location data data 
  export function updateCompanyLocation(data,id) {
    return request({
      url: `/location/company_location/${id}`,
      method: 'put',
      data: data
    })
  }