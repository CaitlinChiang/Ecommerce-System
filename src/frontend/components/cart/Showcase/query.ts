import { gql } from '@apollo/client'

export const GetCart = gql`
  query {
    get_cart {
      _id
      items {
        product {
          imageUrl
          name
        }
        productVariant {
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
