<script setup lang="ts">
import { getMemberDetailApi, putMemberDetailApi } from '@/services/member'
import { useMemberStore } from '@/stores'
import type { ProfileDetail, MemberPutParams } from '@/types/member'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const memberDetail = ref({} as ProfileDetail)
const getMemberDetail = async () => {
  const res = await getMemberDetailApi()
  memberDetail.value = res.result
  console.log(memberDetail)
}
onLoad(() => {
  getMemberDetail()
})
const changePicture = () => {
  uni.chooseMedia({
    count: 1,
    mediaType: ['image'],
    success: (res) => {
      const { tempFilePath } = res.tempFiles[0]
      uni.uploadFile({
        url: '/member/profile/avatar',
        fileType: 'image',
        filePath: tempFilePath,
        name: 'file',
        success: ({ data, statusCode }) => {
          if (statusCode === 200) {
            const newPicture = JSON.parse(data).result.avatar
            memberDetail.value!.avatar = newPicture
            memberStore.profile!.avatar = newPicture
            uni.showToast({ icon: 'success', title: '修改头像成功！' })
          } else {
            uni.showToast({ icon: 'error', title: '失败！' })
          }
        },
        fail: (error) => {
          uni.showToast({ icon: 'error', title: `error${error}` })
        },
      })
    },
  })
}
const memberStore = useMemberStore()

const PutMemberDetail = async () => {
  const { nickname, gender, birthday, profession } = memberDetail.value
  console.log(2222, locationCodes)
  const res = await putMemberDetailApi({
    nickname,
    gender,
    birthday,
    profession,
    provinceCode: locationCodes[0],
    cityCode: locationCodes[1],
    countryCode: locationCodes[2],
  })
  memberDetail.value = res.result
  memberStore.profile!.nickname = res.result.nickname!
  uni.navigateBack()
  uni.showToast({ icon: 'success', title: '修改成功！' })
}
const changeGender: UniHelper.RadioGroupOnChange = (e) => {
  memberDetail.value.gender = e.detail.value as '男' | '女'
}
const changeBirthday: UniHelper.DatePickerOnCancel = (e) => {
  memberDetail.value.birthday = e.detail.value
}
let locationCodes: [string, string, string] = ['', '', '']
const changeLocation: UniHelper.RegionPickerOnChange = (e) => {
  memberDetail.value.fullLocation = e.detail.value.join(' ')
  locationCodes = e.detail.code!
}
</script>

<template>
  <view class="viewport">
    <!-- 导航栏 -->
    <view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
      <navigator open-type="navigateBack" class="back icon-left" hover-class="none"></navigator>
      <view class="title">个人信息</view>
    </view>
    <!-- 头像 -->
    <view class="avatar">
      <view class="avatar-content" @tap="changePicture">
        <image class="image" :src="memberDetail?.avatar" mode="aspectFill" />
        <text class="text">点击修改头像</text>
      </view>
    </view>
    <!-- 表单 -->
    <view class="form">
      <!-- 表单内容 -->
      <view class="form-content">
        <view class="form-item">
          <text class="label">账号</text>
          <text class="account">{{ memberDetail?.account }}</text>
        </view>
        <view class="form-item">
          <text class="label">昵称</text>
          <input
            class="input"
            type="text"
            placeholder="请填写昵称"
            v-model="memberDetail!.nickname"
          />
        </view>
        <view class="form-item">
          <text class="label">性别</text>
          <radio-group @change="changeGender">
            <label class="radio">
              <radio value="男" color="#27ba9b" :checked="memberDetail?.gender === '男'" />
              男
            </label>
            <label class="radio">
              <radio value="女" color="#27ba9b" :checked="memberDetail?.gender === '女'" />
              女
            </label>
          </radio-group>
        </view>
        <view class="form-item">
          <text class="label">生日</text>
          <picker
            class="picker"
            mode="date"
            start="1900-01-01"
            :end="new Date()"
            :value="memberDetail?.birthday"
            @change="changeBirthday"
          >
            <view v-if="memberDetail?.birthday">{{ memberDetail?.birthday }}</view>
            <view class="placeholder" v-else>请选择日期</view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">城市</text>
          <picker
            class="picker"
            mode="region"
            @change="changeLocation"
            :value="memberDetail?.fullLocation?.split(' ')"
          >
            <view v-if="memberDetail?.fullLocation">{{ memberDetail.fullLocation }}</view>
            <view class="placeholder" v-else>请选择城市</view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">职业</text>
          <input
            class="input"
            type="text"
            placeholder="请填写职业"
            v-model="memberDetail!.profession"
          />
        </view>
      </view>
      <!-- 提交按钮 -->
      <button class="form-button" @tap="PutMemberDetail">保 存</button>
    </view>
  </view>
</template>

<style lang="scss">
page {
  background-color: #f4f4f4;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/order_bg.png);
  background-size: auto 420rpx;
  background-repeat: no-repeat;
}

// 导航栏
.navbar {
  position: relative;

  .title {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
  }

  .back {
    position: absolute;
    height: 40px;
    width: 40px;
    left: 0;
    font-size: 20px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

// 头像
.avatar {
  text-align: center;
  width: 100%;
  height: 260rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .image {
    width: 160rpx;
    height: 160rpx;
    border-radius: 50%;
    background-color: #eee;
  }

  .text {
    display: block;
    padding-top: 20rpx;
    line-height: 1;
    font-size: 26rpx;
    color: #fff;
  }
}

// 表单
.form {
  background-color: #f4f4f4;

  &-content {
    margin: 20rpx 20rpx 0;
    padding: 0 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }

  &-item {
    display: flex;
    height: 96rpx;
    line-height: 46rpx;
    padding: 25rpx 10rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;

    &:last-child {
      border: none;
    }

    .label {
      width: 180rpx;
      color: #333;
    }

    .account {
      color: #666;
    }

    .input {
      flex: 1;
      display: block;
      height: 46rpx;
    }

    .radio {
      margin-right: 20rpx;
    }

    .picker {
      flex: 1;
    }
    .placeholder {
      color: #808080;
    }
  }

  &-button {
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    margin: 30rpx 20rpx;
    color: #fff;
    border-radius: 80rpx;
    font-size: 30rpx;
    background-color: #27ba9b;
  }
}
</style>
