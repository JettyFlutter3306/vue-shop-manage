import request from "@/plugins/axios";
import qs from 'qs'

/**
 * 用户登录校验
 */
export function loginAPI(data) {
  return request({
    url: '/userLogin',
    method: 'post',
    data: qs.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
/**
 * 查询用户列表
 */
export function getUsersAPI(query) {
  return request({
    url: '/user',
    method: 'get',
    params: query
  })
}

/**
 * 根据id查询用户信息
 */
export function getUserByIdAPI(userId) {
  return request({
    url: `/user/${userId}`,
    method: 'get'
  })
}

/**
 * 新增用户
 */
export function addUserAPI(user) {
  return request({
    url: '/user',
    method: 'post',
    data: user
  })
}

/**
 * 删除用户
 */
export function deleteUserAPI(id) {
  return request({
    url: `/user/${id}`,
    method: 'delete'
  })
}

/**
 * 修改用户信息
 */
export function editUserAPI(user) {
  return request({
    url: '/user/update',
    method: 'put',
    data: user
  })
}

/**
 * 修改用户状态
 */
export function updateUserStatusAPI(userInfo) {
  return request({
    url: `/user?id=${userInfo.id}&status=${userInfo.status ? 1 : 0}`,
    method: 'put',
    params: {
      id: userInfo.id,
      status: userInfo.status
    }
  })
}
