import { ProductVariantDataloaders } from '../../backend/controllers/productVariants/dataloaders'
import { ProductDataloaders } from '../../backend/controllers/products/dataloaders'
import { UserDataloaders } from '../../backend/controllers/users/dataloaders'

export interface Dataloaders {
  productVariants: ProductVariantDataloaders
  products: ProductDataloaders
  users: UserDataloaders
}
