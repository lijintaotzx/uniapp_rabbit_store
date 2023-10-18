import type { GoodsResult } from '@/types/goods'
import { http } from '@/utils/http'

export const getGoodsDetailApi = (data: { id: string }) => {
  return http<GoodsResult>({
    url: '/goods',
    method: 'GET',
    data,
  })
}
