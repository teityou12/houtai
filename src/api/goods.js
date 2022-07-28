import request from '@/utils/request'

export const getGoodsList = (params) => request({
  url: 'goods',
  params

})

/**
 * 商品分类数据列表
 */

export const getCategories = (params) => request({
  url: 'categories',
  params

})

/**
 * 获取参数列表
 */
export const getCategoriesList = (id, sel) => request({
  url: `categories/${id}/attributes?sel=${sel}`

})
