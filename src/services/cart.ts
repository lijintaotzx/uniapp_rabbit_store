import type { CartItem } from '@/types/card'
import { http } from '@/utils/http'

export const postAddToCartApi = (data: { skuId: string; count: number }) => {
  return http<CartItem>({
    url: '/member/cart',
    method: 'POST',
    data,
  })
}

export const getCartListApi = () => {
  return http<CartItem[]>({
    url: '/member/cart',
    method: 'GET',
  })
}

export const deleteCartItemApi = (ids: string[]) => {
  return http<{ msg: string }>({
    url: '/member/cart',
    method: 'DELETE',
    data: {
      ids: ids,
    },
  })
}
export const putCartCountApi = (skuId: string, data: { selected?: boolean; count?: number }) => {
  return http({
    url: `/member/cart/${skuId}`,
    method: 'PUT',
    data,
  })
}

/**
 * 购物车全选/取消全选
 * @param data selected 是否选中
 */
export const putMemberCartSelectedApi = (data: { selected: boolean }) => {
  return http({
    method: 'PUT',
    url: '/member/cart/selected',
    data,
  })
}
