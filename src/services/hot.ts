import type { PageParams } from '@/types/global'
import type { HotRecommendResult } from '@/types/hot'
import { http } from '@/utils/http'

export type hotParams = PageParams & { subtype?: string }
export const getHotRecommendApi = (url: string, data?: hotParams) => {
  return http<HotRecommendResult>({
    url,
    data,
    method: 'GET',
  })
}
