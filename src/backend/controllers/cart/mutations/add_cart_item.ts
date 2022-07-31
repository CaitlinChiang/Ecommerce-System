import { Context } from '../../../../types/setup/context'
import { Cart, AddCartItemArgs } from '../../../../types/cart'
import { MutateAction } from '../../../_enums/mutateAction'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { mutateArgs } from '../../../_utils/handleArgs/mutateArgs'

export default async (
  _root: undefined,
  args: AddCartItemArgs,
  context: Context
): Promise<Cart> => {
  await authenticateUser({ admin: false, context })

  const cart: any = await context.database.carts.findOneAndUpdate(
    { _userId: context.currentUserId },
    { $push: { items: mutateArgs(args.item, MutateAction.CREATE) } }
  )

  return cart.value
}
