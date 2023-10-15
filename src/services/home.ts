import type { BannerItem } from "@/types/home"
import { http } from "@/utils/http"

// 首页轮播图
export const getHomeBannerApi = (distributionSite = 1) => {
    return http<BannerItem[]>({
        url: `/home/banner?distributionSite=${distributionSite}`,
        method: 'GET',
    })
}