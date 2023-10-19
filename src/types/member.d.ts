export type LoginResult = {
  account: string
  avatar: string
  id: number
  mobile: string
  nickname: string
  token: string
}

/** 个人信息 用户详情信息 */
export type ProfileDetail = {
  /** 用户ID */
  id: number
  /** 头像  */
  avatar: string
  /** 账户名  */
  account: string
  /** 昵称 */
  nickname?: string
  /** 性别 */
  gender?: Gender
  /** 生日 */
  birthday?: string
  /** 省市区 */
  fullLocation?: string
  /** 职业 */
  profession?: string
}
/** 性别 */
export type Gender = '女' | '男'

export type MemberPutParams = {
  nickname?: string
  gender?: Gender
  birthday?: string
  profession?: string
  provinceCode?: string
  cityCode?: string
  countryCode?: string
}
