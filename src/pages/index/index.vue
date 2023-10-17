<template>
  <CustomNavbar />
  <scroll-view class="scroll-view" scroll-y :refresher-enabled="true" :refresher-triggered="refreshTrigger"
    @refresherrefresh="onRefresherrefresh" @scrolltolower="onScrolltolower">
    <XtxSwiper :bannerList="banneList" />
    <CategoryPanel ref="categoryRef" />
    <HotPanel ref="hotRef" />
    <XtxGuess ref="guessRef" />
  </scroll-view>
</template>

<script setup lang="ts">
//
import { onLoad } from '@dcloudio/uni-app';
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue';
import HotPanel from './components/HotPanel.vue';
import { getHomeBannerApi } from '@/services/home'
import { ref } from 'vue';
import type { BannerItem, CategoryPanelInstance, HotPanelInstance } from '@/types/home'
import type { XtxGuessInstance } from '@/types/component'

const guessRef = ref<XtxGuessInstance>()
const hotRef = ref<HotPanelInstance>()
const categoryRef = ref<CategoryPanelInstance>()

const onScrolltolower = () => {
  console.log('滚动到底了！当前页码：', guessRef.value?.pageInfo)
  guessRef.value?.getMore()
}
const banneList = ref<BannerItem[]>([])
const refreshTrigger = ref(false)

// 获取轮播图数据
const getHomeBanner = async () => {
  const bannerData = await getHomeBannerApi()
  banneList.value = bannerData.result
}
// 下拉刷新
const onRefresherrefresh = async () => {
  refreshTrigger.value = true
  console.log('下拉刷新了！')
  // await getHomeBanner()
  // await categoryRef.value?.refresh()
  // await hotRef.value?.refresh()
  // await guessRef.value?.resetPage()
  // API一起加载数据
  await Promise.all([getHomeBanner(), categoryRef.value?.refresh(), hotRef.value?.refresh(), guessRef.value?.resetPage()])
  console.log('数据刷新了')
  refreshTrigger.value = false
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

