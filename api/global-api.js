// getting all the respected kyc doc models
export function getKycDocs(params,userType) {
  const user = (userType === 'company') ? 'company_owner' : 'admin';
  return request({
    url: `/nova_auth/${user}_kyc/`,
    method: "get",
    params,
  });
}
// creating a new kyc doc model
export function createNewKycDocModel(data,userType) {
  const user = (userType === 'company') ? 'company_owner' : 'admin';
  return request({
    url: `/nova_auth/${user}_kyc/`,
    method: "post",
    data,
  });
}
// getting doc upload server links
export function getServerForDocUpload(uId, params,userType) {
  const user = (userType === 'company') ? 'company_owner' : 'admin';
  return request({
    url: `/nova_auth/${user}/${uId}/document`,
    method: "post",
    params,
  });
}
