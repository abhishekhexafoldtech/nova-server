import request from '@/utils/request';


export function addNewDistributor(data) {
    return request({
      url: '/nova_auth/company_owner/',
      method: 'post',
      data
    })
  }

  //get otp

  export function sendOtp(query) {
    return request({
      url: '/nova_auth/company_owner/send_otp',
      method: 'get',
      params: query
    })
  }

  //verify otp

  export function verifyOtp(data) {
    return request({
      url: '/nova_auth/company_owner/verify_otp',
      method: 'post',
      data
    })
  }

    //create company owner kyc
    export function createComapanyOwnerKyc(data) {
      return request({
        url: '/nova_auth/company_owner_kyc/',
        method: 'post',
        data: data
      })
    }

    // distributor (company owner) kyc

    export function getComapanyOwnerKyc(query) {
      return request({
        url: '/nova_auth/company_owner_kyc/',
        method: 'get',
        params: query
      })
    }
  
    //upload national id documents
  
    export function uploadNationalId(query,id) {
      return request({
        url: `/nova_auth/company_owner/${id}/document`,
        method: 'post',
        params: query
      })
    }


// ..........................................................

  //create company owner kyc
  export function createComapanyKyc(data) {
    return request({
      url: '/nova_auth/company_kyc/',
      method: 'post',
      data: data
    })
  }

// get all company kyc

export function getAllComapanyKyc(query) {
  return request({
    url: '/nova_auth/company_kyc/',
    method: 'get',
    params: query
  })
}

//upload company document
export function uploadCompanyDocument(query,id) {
  return request({
    url: `/nova_auth/company/${id}/document`,
    method: 'post',
    params: query
  })
}

//create company
export function createCompany(data){
  return request({
    url:'/nova_auth/company/',
    method:"post",
    data:data
  })
}


// // get all company 

//     export function getAllCompany(){
//       return request({
//         url:'/company/'
//       })
//     }
  
//post company location

export  function postCompanyLocation(data){
  return request({
    url:'/location/company_location',
    method:"post",
    data:data
  })
}

//...........................insurence deatails........................................

export  function postCompanyInsurenceDetails(data,company_id){
  return request({
    url:`/nova_auth/Company/${company_id}/insurance`,
    method:"post",
    data:data
  })
}