import { gql } from '@apollo/client'

export default gql`
  mutation ($item: CartItemInput!) {
    add_cart_item(item: $item)
  }
`
