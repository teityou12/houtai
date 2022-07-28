import request from '@/utils/request'

/**
 * 获取角色列表
 */

export const getRoleslist = (params) => request({
  url: 'roles',
  params
})
