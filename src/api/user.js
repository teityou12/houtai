import request from '@/utils/request'

export const login = (data) => request({
  url: 'login',
  method: 'POST',
  data

})

/**
 * 获取用户列表
 */

export const getUserlist = (params) => request({
  url: 'users',
  params
})

/**
 * 删除用户
 */
export function deleteUser (id) {
  return request({
    url: `users/${id}`,
    method: 'DELETE'
  })
}
