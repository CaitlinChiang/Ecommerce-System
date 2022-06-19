import { PaymentDataloaders } from '../../controllers/payments/dataloaders'
import { ProductCategoryDataloaders } from '../../controllers/productCategories/dataloaders'
import { ProductVariantDataloaders } from '../../backend/controllers/productVariants/dataloaders'
import { ProductDataloaders } from '../../backend/controllers/products/dataloaders'
import { UserDataloaders } from '../../backend/controllers/users/dataloaders'

export interface Dataloaders {
  payments: PaymentDataloaders
  productCategories: ProductCategoryDataloaders
  productVariants: ProductVariantDataloaders
  products: ProductDataloaders
  users: UserDataloaders
}
