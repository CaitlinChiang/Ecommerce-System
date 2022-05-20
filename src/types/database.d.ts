import { Collection } from 'mongodb'
import { AuditLog } from './auditLog'
import { Cart } from './cart'
import { Order } from './order'
import { Payment } from './payment'
import { Product } from './product'
import { ProductVariant } from './productVariant'
import { User } from './user'

export interface Database {
  auditLogs: Collection<AuditLog>
  carts: Collection<Cart>
  orders: Collection<Order>
  payments: Collection<Payment>
  products: Collection<Product>
  productVariants: Collection<ProductVariant>
  users: Collection<User>
}
