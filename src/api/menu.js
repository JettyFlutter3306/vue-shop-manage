import request from "@/plugins/axios";

export function getMenusAPI() {
  return request({
    url: '/right/menus',
    method: 'get'
  })
}
