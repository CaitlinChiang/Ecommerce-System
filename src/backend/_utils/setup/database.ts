import { Db } from 'mongodb'
import { Database } from 'types/database'

import { AuditLog } from 'types/auditLog'
import { Cart } from 'types/cart'
import { Order } from 'types/order'
import { Payment } from 'types/payment'
import { Product } from 'types/product'
import { ProductVariant } from 'types/productVariant'
import { Review } from 'types/review'
import { User } from 'types/user'

export default (db: Db): Database => {
  return {
    auditLogs: db.collection<AuditLog>('auditLogs'),
    carts: db.collection<Cart>('carts'),
    orders: db.collection<Order>('orders'),
    payments: db.collection<Payment>('payments'),
    products: db.collection<Product>('products'),
    productVariants: db.collection<ProductVariant>('productVariants'),
    reviews: db.collection<Review>('reviews'),
    users: db.collection<User>('users')
  }
}
