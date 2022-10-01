import isEmail from 'validator/lib/isEmail'
import isMobilePhone from 'validator/lib/isMobilePhone'
import { formatFee } from '../handleFormat/formatFee'
import { formatToDecimal } from '../handleFormat/formatToDecimal'
import { formatStockQuantity } from '../handleFormat/formatStockQuantity'

export const correctArgs = (args: any): any => {
  Object.keys(args).forEach((key: string): void => {
    const val = args[key]

    if (typeof val === 'string') modifyArgs(key, args)

    if (typeof val === 'object' && val && !Array.isArray(val)) {
      Object.keys(val).forEach((key: string) => modifyArgs(key, val))
    }

    if (['deliveryAddress', 'email', 'password', 'phoneNumber'].includes(key)) {
      validateArgs(args)
    }
  })

  return args
}

const modifyArgs = (key: string, args: any): any => {
  const val = args[key]

  if (isNaN(val) && !isImage && val?.trim().length === 0) {
    args[key] = null
  }

  if (key === 'discount') {
    args[key] = formatToDecimal(args[key])
  }

  if (key === 'shippingFee' || key === 'price') {
    args[key] = formatFee(args[key])
  }

  if (key === 'stockQuantity') {
    args[key] = formatStockQuantity(args[key])
  }
}

const isImage = (val: any): boolean => {
  return val && val['type'].split('/')[0] === 'image'
}

const validateArgs = (args: any): any => {
  const { deliveryAddress, email, password, phoneNumber } = args

  // CHECK DELIVERY ADDRESS ONLY IF THE INPUT IS NOT FROM USER PROFILE
  if (deliveryAddress && !args.email) {
    const { address, cityId } = deliveryAddress

    const noAddress = address === null || address?.length === 0
    const noCityId = cityId === null || cityId === undefined

    if (noAddress || noCityId) args.deliveryAddress = null
  }

  if (email && !isEmail(email)) {
    args.email = null
  }

  if (password && password?.length < 8) {
    args.password = null
  }

  if (phoneNumber && !isMobilePhone(phoneNumber)) {
    args.phoneNumber = null
  }

  return args
}
