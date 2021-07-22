import request from "@/plugins/axios";

export function getGoodsAPI(query) {
  return request({
    url: '/goods',
    method: 'get',
    params: query
  })
}

export function deleteGoodsAPI(id) {
  return request({
    url: `goods/${id}`,
    method: 'delete'
  })
}
