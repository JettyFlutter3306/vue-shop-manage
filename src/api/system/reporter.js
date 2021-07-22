import request from "@/plugins/axios";

export function getUserReportAPI() {
  return request({
    url: '/report/type/1',
    method: 'get'
  })
}
