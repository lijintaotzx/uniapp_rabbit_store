import type { LoginResult } from '@/types/member'
import { http } from '@/utils/http'

type LoginParams = {
  code: string
  encrytedData: string
  iv: string
}

export const postLoginWxMinApi = (data: LoginParams) => {
  console.log(222, data)
  return http<LoginResult>({
    method: 'POST',
    url: '/login/wxMin',
    data,
  })
}

export const postLoginWxMinSimpleApi = (phoneNumber: string) => {
  return http<LoginResult>({
    method: 'POST',
    url: '/login/wxMin/simple',
    data: {
      phoneNumber,
    },
  })
}