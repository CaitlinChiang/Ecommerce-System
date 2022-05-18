import { Db } from 'mongodb'
import { Database } from 'types/database'

import { AuditLog } from 'types/auditLog'
import { Order } from 'types/order'
import { Payment } from 'types/payment'
import { Product } from 'types/product'
import { ProductVariant } from 'types/productVariant'
import { User } from 'types/user'

export default (db: Db): Database => {
  return {
    auditLogs: db.collection<AuditLog>('auditLogs'),
    orders: db.collection<Order>('orders'),
    payments: db.collection<Payment>('payments'),
    products: db.collection<Product>('products'),
    productVariants: db.collection<ProductVariant>('productVariants'),
    users: db.collection<User>('users')
  }
}
