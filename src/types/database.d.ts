import { Collection } from 'mongodb'
import { AuditLog } from './auditLog'
import { Order } from './order'
import { Payment } from './payment'
import { Product } from './product'
import { ProductVariant } from './productVariant'
import { User } from './user'

export interface Database {
  auditLogs: Collection<AuditLog>
  orders: Collection<Order>
  payments: Collection<Payment>
  products: Collection<Product>
  productVariants: Collection<ProductVariant>
  users: Collection<User>
}
