import { ReactElement } from 'react'
import { TableCell, TableRow } from '@mui/material'
import { CartItem } from '../../../../types/cart'
import ModalComponent from '../../_common/ModalComponent'
import SimpleTableComponent from '../../_common/SimpleTableComponent'
import { formatNumber } from '../../../_utils/handleFormat/formatNumber'
import { formatPrice } from '../../../_utils/handleFormat/formatPrice'

const OrderItemsTable = ({
  items,
  onClose,
  open
}: {
  items: CartItem[]
  onClose: VoidFunction
  open: boolean
}): ReactElement => {
  const itemHeaders = ['Quantity', 'Item', 'Price']

  const itemRows = [
    items?.map((item: CartItem): ReactElement => {
      const { product, productVariant, quantity, totalPrice } = item

      return (
        <TableRow>
          <TableCell>{formatNumber(quantity)}</TableCell>
          <TableCell>
            {product?.name}
            {productVariant?.name && ` [${productVariant?.name}]`}
          </TableCell>
          <TableCell>{`P${formatPrice(totalPrice)}`}</TableCell>
        </TableRow>
      )
    })
  ]

  return (
    <ModalComponent
      content={<SimpleTableComponent headers={itemHeaders} rows={itemRows} />}
      onClose={onClose}
      open={open}
      title={'Order Items'}
    />
  )
}

export default OrderItemsTable
