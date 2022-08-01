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

/**
 * 修改动态参数
 */
export const editCategoriesList = (data) => request({
  method: 'put',
  url: `categories/${data.id}/attributes/${data.attrId}`,
  data

})

/**
 * 添加动态参数
 */

export const addCategoriesList = (data) => request({
  method: 'POST',
  url: `categories/${data.id}/attributes`,
  data
})

/**
 * 上传图片
 */
export const addpicture = (data) => request({
  method: 'POST',
  url: 'upload',
  data
})

