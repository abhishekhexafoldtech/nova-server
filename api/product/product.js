import request from '@/utils/request'

export function ProductCategory(data,type,id) {
  return request({
    url: `/product/productcategories/${id}`,
    method: type,
    data
  });
};

export function ProductSubCategory(data,type,id) {
  return request({
    url: `/product/productsubcategories/${id}`,
    method: type,
    data
  });
};

export function AdminProduct(data){
    return request({
        url:   `/product/products/admin`,
        method: 'post',
        data
    })
};

export function ProductStyleAdmin(data){
  return request({
    url:`/product/productstyles/admin`,
    method: "post",
    data
  })
};

export function ProductsByProductId(data,type,id){
  return request({
    url:`/product/products/admin/${id}`,
    method: type,
    data
  })
};

export function ProductStyle(data,type,id){
  return request({
    url: `/product/productstyles/${id}`,
    method: type,
    data : data ? data : {}
  })
};

