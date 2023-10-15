<script setup lang="ts">
//
import { onLoad } from '@dcloudio/uni-app';
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue';
import { getHomeBannerApi } from '@/services/home'
import { ref } from 'vue';
import type { BannerItem } from '@/types/home'

// 获取轮播图数据
const banneList = ref<BannerItem[]>([])
const getHomeBanner = async () => {
  const bannerData = await getHomeBannerApi()
  banneList.value = bannerData.result
}

onLoad(() => {
  getHomeBanner()
})
</script>

<template>
  <view class="index">
    <CustomNavbar />
    <XtxSwiper :bannerList="banneList" />
    <CategoryPanel />
  </view>
</template>

<style lang="scss">
//
page {
  background: #F7F7F7;
}
</style>

