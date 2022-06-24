import { CityDataloaders } from '../../controllers/cities/dataloaders'
import { PaymentMethodDataloaders } from 'backend/controllers/paymentMethods/dataloaders'
import { PaymentDataloaders } from '../../controllers/payments/dataloaders'
import { ProductCategoryDataloaders } from '../../controllers/productCategories/dataloaders'
import { ProductVariantDataloaders } from '../../backend/controllers/productVariants/dataloaders'
import { ProductDataloaders } from '../../backend/controllers/products/dataloaders'
import { UserDataloaders } from '../../backend/controllers/users/dataloaders'

export interface Dataloaders {
  cities: CityDataloaders
  paymentMethods: PaymentMethodDataloaders
  payments: PaymentDataloaders
  productCategories: ProductCategoryDataloaders
  productVariants: ProductVariantDataloaders
  products: ProductDataloaders
  users: UserDataloaders
}
