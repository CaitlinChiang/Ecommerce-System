import isEmail from 'validator/lib/isEmail'
import isMobilePhone from 'validator/lib/isMobilePhone'
import { formatFee } from '../handleFormat/formatFee'
import { formatFromPercentage } from '../handleFormat/formatFromPercentage'
import { formatStockQuantity } from '../handleFormat/formatStockQuantity'

export const correctArgs = (args: any): any => {
  Object.keys(args).forEach((key: string): void => {
    const val = args[key]

    if (typeof val === 'string') modifyArgs(args, key)

    if (typeof val === 'object' && val && !Array.isArray(val)) {
      Object.keys(val).forEach((k: string) => modifyArgs(val, k))
    }

    if (['deliveryAddress', 'email', 'password', 'phoneNumber'].includes(key)) {
      validateArgs(args)
    }
  })

  return args
}

const modifyArgs = (args: any, key: string): any => {
  if (isNaN(args[key]) && !isImage && args[key]?.trim().length === 0) {
    args[key] = null
  }

  if (key === 'discount') {
    args[key] = formatFromPercentage(args[key])
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

  // DELIVERY ADDRESS CHECK ONLY IF THE INPUT IS NOT FROM USER PROFILE
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
