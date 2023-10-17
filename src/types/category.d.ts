import type { GoodsItem } from './global'

export type categoryPageItem = {
  id: string
  name: string
  picture: string
  imageBanners: string[]
  children: categoryChildrenItem[]
}
export type categoryChildrenItem = {
  id: string
  name: string
  picture: string
  goods: GoodsItem[]
}
