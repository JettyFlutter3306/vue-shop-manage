import request from "@/plugin/axios";

export function getOrdersAPI(query) {
  return request({
    url: '/order',
    method: 'get',
    params: query
  })
}
