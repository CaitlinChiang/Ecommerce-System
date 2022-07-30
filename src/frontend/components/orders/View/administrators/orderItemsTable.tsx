import { ReactElement } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import { CartItem } from '../../../../../types/cart'
import { formatNumber } from '../../../../_utils/handleFormatting/formatNumber'

const OrderItemsTable = ({ items }: { items: CartItem[] }): ReactElement => {
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
    <TableContainer>
      <Table size={'small'}>
        <TableHead>
          <TableRow>
            {itemHeaders.map((header: string, index: number): ReactElement => {
              return (
                <TableCell key={index} align={'center'} padding={'checkbox'}>
                  {header}
                </TableCell>
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody>{itemRows}</TableBody>
      </Table>
    </TableContainer>
  )
}

export default OrderItemsTable
