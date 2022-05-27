import { Collection } from 'mongodb'
import { AuditLog } from './auditLog'
import { Cart } from './cart'
import { FAQ } from './faq'
import { Order } from './order'
import { Payment } from './payment'
import { Product } from './product'
import { ProductVariant } from './productVariant'
import { Review } from './review'
import { User } from './user'

export interface Database {
  auditLogs: Collection<AuditLog>
  carts: Collection<Cart>
  faqs: Collection<FAQ>
  orders: Collection<Order>
  payments: Collection<Payment>
  products: Collection<Product>
  productVariants: Collection<ProductVariant>
  reviews: Collection<Review>
  users: Collection<User>
}
