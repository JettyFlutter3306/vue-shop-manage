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
