import { ReactElement } from 'react'
import { TableCell, TableRow } from '@mui/material'
import { CartItem } from '../../../../types/cart'
import ModalComponent from '../../_common/ModalComponent'
import SimpleTableComponent from '../../_common/SimpleTableComponent'
import { formatNumber } from '../../../_utils/handleFormat/formatNumber'

const OrderItemsTable = ({
  items,
  onClose,
  open
}: {
  items: CartItem[]
  onClose: VoidFunction
  open: boolean
}): ReactElement => {
  const itemHeaders = ['Quantity', 'Item']

  const itemRows = [
    items?.map((item: CartItem): ReactElement => {
      const { product, productVariant, quantity } = item

      return (
        <TableRow>
          <TableCell>{formatNumber(quantity)}</TableCell>
          <TableCell>
            {product?.name}
            {productVariant?.name && ` [${productVariant?.name}]`}
          </TableCell>
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
