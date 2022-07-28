import request from '@/utils/request'

/**
 * 获取权限列表
 */

export const getPowerlist = (type) => request({
  url: `rights/${type}`

})
