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