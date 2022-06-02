import { Collection } from 'mongodb'
import { AuditLog } from './auditLog'
import { Cart } from './cart'
import { City } from './city'
import { FAQ } from './faq'
import { Order } from './order'
import { PaymentMethod } from './paymentMethod'
import { Payment } from './payment'
import { ProductCategory } from './productCategory'
import { ProductVariant } from './productVariant'
import { Product } from './product'
import { Review } from './review'
import { User } from './user'
import { WebsiteText } from './websiteText'

export interface Database {
  auditLogs: Collection<AuditLog>
  carts: Collection<Cart>
  cities: Collection<City>
  faqs: Collection<FAQ>
  orders: Collection<Order>
  paymentMethods: Collection<PaymentMethod>
  payments: Collection<Payment>
  productCategories: Collection<ProductCategory>
  productVariants: Collection<ProductVariant>
  products: Collection<Product>
  reviews: Collection<Review>
  users: Collection<User>
  websiteTexts: Collection<WebsiteText>
}
