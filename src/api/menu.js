import request from "@/plugins/axios"

export function getMenusAPI(uid) {
  return request({
    url: `/right/menus/${uid}`,
    method: 'get',
    params: {
      tree: "tree"
    }
  })
}
