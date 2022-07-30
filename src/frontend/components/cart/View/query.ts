import { gql } from '@apollo/client'

export const GetCart = gql`
  query {
    get_cart {
      _id
      items {
        product {
          _id
          imageUrl
          name
        }
        productVariant {
          _id
          imageUrl
          name
        }
        quantity
        totalPrice
      }
      quantity
      totalPrice
    }
  }
`
