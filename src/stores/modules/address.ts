import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { AddressListItem } from '@/types/address'

export const useAddressStore = defineStore('address', () => {
  const selectedAdress = ref<AddressListItem>()
  const changeSelectedAddress = (val: AddressListItem) => {
    selectedAdress.value = val
  }
  return {
    selectedAdress,
    changeSelectedAddress,
  }
})
