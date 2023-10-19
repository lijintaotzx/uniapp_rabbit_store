import type { MemberPutParams, ProfileDetail } from '@/types/member'
import { http } from '@/utils/http'

export const getMemberDetailApi = () => {
  return http<ProfileDetail>({
    url: '/member/profile',
    method: 'GET',
  })
}

export const putMemberDetailApi = (data: MemberPutParams) => {
  return http<ProfileDetail>({
    method: 'PUT',
    url: '/member/profile',
    data,
  })
}
