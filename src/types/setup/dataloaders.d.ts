import { ProductVariantDataloaders } from '../../backend/controllers/productVariants/dataloaders'
import { UserDataloaders } from '../../backend/controllers/users/dataloaders'

export interface Dataloaders {
  productVariants: ProductVariantDataloaders
  users: UserDataloaders
}
