<template>
  <CustomNavbar />
  <scroll-view class="scroll-view" scroll-y :refresher-enabled="true" :refresher-triggered="true"
    @refresherrefresh="onRefresherrefresh" @scrolltolower="onScrolltolower">
    <XtxSwiper :bannerList="banneList" />
    <CategoryPanel />
    <Hotpanel />
    <XtxGuess ref="guessRef" />
  </scroll-view>
</template>

<script setup lang="ts">
//
import { onLoad } from '@dcloudio/uni-app';
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue';
import Hotpanel from './components/Hotpanel.vue';
import { getHomeBannerApi } from '@/services/home'
import { ref } from 'vue';
import type { BannerItem } from '@/types/home'
import type { XtxGuessInstance } from '@/types/component'

// 获取轮播图数据
const banneList = ref<BannerItem[]>([])
const getHomeBanner = async () => {
  const bannerData = await getHomeBannerApi()
  banneList.value = bannerData.result
}
const onRefresherrefresh = () => {
  console.log('下拉刷新了！')
}
// 获取猜你喜欢ref实例
const guessRef = ref<XtxGuessInstance>()
const onScrolltolower = () => {
  console.log('滚动到底了！当前页码：', guessRef.value?.pageInfo)
  guessRef.value?.getMore()

}

onLoad(() => {
  getHomeBanner()
})
</script>

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

