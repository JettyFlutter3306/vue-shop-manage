import request from "@/plugins/axios";

/**
 * 获取所有的分类
 */
export function getCategoriesAPI(query) {
  return request({
    url: '/category',
    method: 'get',
    params: query
  })
}

/**
 * 获取父级分类
 * @param type      父级分类默认是 type == 2  !!
 */
export function getParentCategoryAPI(type) {
  return request({
    url: '/category/categoryList',
    method: 'get',
    params: type
  })
}

/**
 * 添加分类
 */
export function addCategoryAPI(data) {
  return request({
    url: '/category',
    method: 'post',
    data: data
  })
}

/**
 * 根据id获取分类信息
 */
export function getCategoryByIdAPI(id) {
  return request({
    url: `/category/${id}`,
    method: 'get'
  })
}

/**
 * 更新分类
 */
export function updateCategoryAPI(data) {
  return request({
    url: '/category',
    method: 'put',
    data: data
  })
}

/**
 * 删除分类
 */
export function deleteCategoryAPI(id) {
  return request({
    url: `/category/${id}`,
    method: 'delete'
  })
}
