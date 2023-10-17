import type { categoryPageItem } from '@/types/category'
import { http } from '@/utils/http'

export const getCategoryPageApi = () => {
  return http<categoryPageItem[]>({
    url: '/category/top',
    method: 'GET',
  })
}
