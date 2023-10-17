import type { GoodsItem, PageResult } from './global'

export type subTypeItem = {
  id: string
  title: string
  goodsItems: PageResult<GoodsItem>
}

export type HotRecommendResult = {
  bannerPicture: string
  id: string
  title: string
  // 子类选项
  subTypes: subTypeItem[]
}
