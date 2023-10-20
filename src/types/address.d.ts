export type PostAddressParams = {
  receiver: string
  contact: string
  provinceCode: string
  cityCode: string
  countyCode: string
  address: string
  isDefault: number
}

export type AddressListItem = {
  id: string
  receiver: string
  contact: string
  provinceCode: string
  cityCode: string
  countyCode: string
  fullLocation: string
  address: string
  isDefault: number
}
