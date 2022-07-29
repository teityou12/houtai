import request from '@/utils/request'

/**
 * 订单数据列表
 */

export const getOderslist = (params) => request({
  url: 'orders',
  params

})
