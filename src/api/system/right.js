import request from "@/plugins/axios";

export function getRightsAPI(type) {
  return request({
    url: '/right',
    method: 'get',
    params: {
      tree: type
    }
  })
}

export function allotRightsAPI(roleId, ids) {
  return request({
    url: `/role/${roleId}`,
    method: 'post',
    data: ids
  })
}
