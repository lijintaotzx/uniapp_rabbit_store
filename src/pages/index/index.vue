<script setup lang="ts">
//
import { onLoad } from '@dcloudio/uni-app';
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue';
import Hotpanel from './components/Hotpanel.vue';
import { getHomeBannerApi } from '@/services/home'
import { ref } from 'vue';
import type { BannerItem } from '@/types/home'
import type XtxGuessVue from '@/components/XtxGuess.vue';

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
  <CustomNavbar />
  <scroll-view class="scroll-view" scroll-y>
    <XtxSwiper :bannerList="banneList" />
    <CategoryPanel />
    <Hotpanel />
    <XtxGuess />
  </scroll-view>
</template>

<style lang="scss">
//
page {
  background: #F7F7F7;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.scroll-view {
  flex: 1;
}
</style>

