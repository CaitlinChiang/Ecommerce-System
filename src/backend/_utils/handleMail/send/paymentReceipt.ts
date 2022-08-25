import { ObjectId } from 'mongodb'
import { Context } from '../../../../types/setup/context'
import { CartItem } from '../../../../types/cart'
import { City } from '../../../../types/city'
import { Order } from '../../../../types/order'
import { Payment } from '../../../../types/payment'
import { User } from '../../../../types/user'
import { formatDateTime } from '../../handleFormat/formatDateTime'
import { formatPrice } from '../../handleFormat/formatPrice'
import { returnCartItems } from '../../handleData/returnCartItems'

const AWS = require('../../setup/aws-ses')

export const sendPaymentReceipt = async (
  orderId: ObjectId,
  payment: Payment,
  context: Context
): Promise<void> => {
  if (!orderId) return

  const order: Order = await context.database.orders.findOne({ _id: orderId })
  const orderItems: CartItem[] = await returnCartItems(order.items, context)
  const user: User = await context.database.users.findOne({ _id: order.userId })
  const city: City = await context.database.cities.findOne({
    _id: order.deliveryAddress.cityId
  })

  let items = '['

  for (let i = 0, n = orderItems?.length; i < n; i++) {
    const cartItem: CartItem = orderItems[i]

    const { quantity, totalPrice } = cartItem
    const name = cartItem?.productVariant?.name || cartItem?.product?.name

    items += `{ "name": "${name}", "quantity": "${quantity}", "totalPrice": "${totalPrice}" }, `
  }

  const args = {
    Destination: {
      CcAddresses: [],
      ToAddresses: [user.email]
    },
    Template: 'PAYMENT_RECEIPT_TEMPLATE',
    TemplateData: `{ "orderId": "${orderId}", "createdAt": "${formatDateTime(
      order.createdAt
    )}", "user": { "firstName": "${user.firstName}", "lastName": "${
      user.lastName
    }", "phoneNumber": "${user.phoneNumber}", "email": "${
      user.email
    }" }, "address": "${order.deliveryAddress.address}", "city": "${
      city.name
    }", "items": ${items.slice(0, -2) + ']'}, "payment": { "amountDue": "${
      payment.amountDue
    }", "shippingFee": "${payment.shippingFee}", "total": "${formatPrice(
      payment.amountDue + payment.shippingFee
    )}" } }`,
    Source: 'estoree.services@gmail.com',
    ReplyToAddresses: []
  }

  const sendEmail = new AWS.SES({ apiVersion: '2010-12-01' })
    .sendTemplatedEmail(args)
    .promise()

  sendEmail
    .then((data) => console.log(data))
    .catch((err) => console.error(err, err.stack))
}
