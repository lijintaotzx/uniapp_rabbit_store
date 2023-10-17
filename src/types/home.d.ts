import CategoryPanel from '@/pages/index/components/CategoryPanel.vue'
import HotPanel from '@/pages/index/components/HotPanel.vue'

export type BannerItem = {
    hrefUrl: string,
    imgUrl: string,
    id: string,
    type: string,
}

export type CategoryItem = {
    id: string,
    name: string,
    icon: string,
}

export type HotItem = {
    id: string,
    alt: string,
    pictures: string[],
    taget: string,
    title: string,
    type: number,
}

export type CategoryPanelInstance = InstanceType<typeof CategoryPanel>
export type HotPanelInstance = InstanceType<typeof HotPanel>