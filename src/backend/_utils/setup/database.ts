import { Db } from 'mongodb'
import { Database } from '../../../types/database'

import { AuditLog } from '../../../types/auditLog'
import { Cart } from '../../../types/cart'
import { City } from '../../../types/city'
import { FAQ } from '../../../types/faq'
import { Order } from '../../../types/order'
import { PaymentMethod } from '../../../types/paymentMethod'
import { Payment } from '../../../types/payment'
import { ProductCategory } from '../../../types/productCategory'
import { ProductVariant } from '../../../types/productVariant'
import { Product } from '../../../types/product'
import { Review } from '../../../types/review'
import { User } from '../../../types/user'
import { WebsiteText } from '../../../types/websiteText'

export default (db: Db): Database => {
  return {
    auditLogs: db.collection<AuditLog>('auditLogs'),
    carts: db.collection<Cart>('carts'),
    cities: db.collection<City>('cities'),
    faqs: db.collection<FAQ>('faqs'),
    orders: db.collection<Order>('orders'),
    paymentMethods: db.collection<PaymentMethod>('paymentMethods'),
    payments: db.collection<Payment>('payments'),
    productCategories: db.collection<ProductCategory>('productCategories'),
    productVariants: db.collection<ProductVariant>('productVariants'),
    products: db.collection<Product>('products'),
    reviews: db.collection<Review>('reviews'),
    users: db.collection<User>('users'),
    websiteTexts: db.collection<WebsiteText>('websiteTexts')
  }
}
