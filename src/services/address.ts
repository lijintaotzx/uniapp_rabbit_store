import type { AddressListItem, PostAddressParams } from '@/types/address'
import { http } from '@/utils/http'

export const postAddressApi = (data: PostAddressParams) => {
  return http<{ id: string }>({
    url: '/member/address',
    method: 'POST',
    data,
  })
}

export const getAddressListApi = () => {
  return http<AddressListItem[]>({
    url: '/member/address',
    method: 'GET',
  })
}

export const getAddressDetailApi = (id: string) => {
  return http<AddressListItem>({
    url: `/member/address/${id}`,
    method: 'GET',
  })
}

export const putAddressApi = (data: AddressListItem) => {
  return http<{ id: string }>({
    url: `/member/address/${data.id}`,
    method: 'PUT',
    data,
  })
}

export const deleteAddressApi = (id: string) => {
  return http<{ id: string }>({
    url: `/member/address/${id}`,
    method: 'DELETE',
  })
}
