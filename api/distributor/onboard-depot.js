import request from '@/utils/request';

export function createComapanyLocation(data) {
  return request({
    url: "/location/company_location",
    method: "post",
    data: data,
  });
}

//create location kyc
export function createComapanyLocationKyc(data) {
  return request({
    url: "/location/company_location_kyc/",
    method: "post",
    data: data,
  });
}

//get all location kyc
export function getAllLocationKyc() {
  return request({
    url: "/location/company_location_kyc",
    method: "get",
  });
}

//Post company location Insurence Details
export function postLocationInsurenceDetails(data, id) {
  return request({
    url: `/location/company_location/${id}/insurance`,
    method: "post",
    data: data,
  });
}

// post company location kyc doc
// uploadCompanyLocationDocument
export function uploadCompanyLocationKycDocument(param, id) {
  return request({
    url: `/location/company_location/${id}/document`,
    method: "post",
    params: param,
  });
}

//get business insurance detailes

export function getBusinessInsuranceDetail(company_id, insurance_id) {
  return request({
    url: `/nova_auth/Company/${company_id}/insurance/${insurance_id}`,
    method: "get",
  });
}
