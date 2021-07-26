import request from "@/plugins/axios";

export function getRolesAPI() {
  return request({
    url: '/role/roleName',
    method: 'get'
  })
}

export function getRoleListAPI() {
  return request({
    url: '/role',
    method: 'get'
  })
}

export function getRolesByUserIdAPI(uid) {
  return request({
    url: `/role/user/${uid}`,
    method: 'get'
  })
}

export function allotRolesAPI(uid, roleIdList) {
  return request({
    url: `/role/allot/${uid}`,
    method: 'post',
    data: roleIdList
  })
}
