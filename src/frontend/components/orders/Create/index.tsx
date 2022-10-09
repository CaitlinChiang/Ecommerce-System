import { ReactElement, useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GetCart } from '../../cart/View/query'
import { GetCity } from '../../cities/View/query'
import { GetPaymentMethod } from '../../paymentMethods/View/query'
import { GetUser } from '../../users/View/query'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import { Card, CardContent, CircularProgress, Grid, Typography } from '@mui/material'
import { Cart, CartItem } from '../../../../types/cart'
import { City } from '../../../../types/city'
import { CreateOrderArgs } from '../../../../types/order'
import { PaymentMethod } from '../../../../types/paymentMethod'
import { User } from '../../../../types/user'
import OrderSummary from './orderSummary'
import CitiesSelect from '../../cities/View/select'
import PaymentMethodsSelect from '../../paymentMethods/View/select'
import Text from '../../_common/TextField'
import ImageUploader from '../../_common/ImageUploader'
import MutationButton from '../../_common/MutationButton'
import { correctArgs } from '../../../_utils/handleArgs/correctArgs'

const globalAny: any = global

const CreateOrder = (): ReactElement => {
  const router = useRouter()

  const [args, setArgs] = useState<CreateOrderArgs>({
    deliveryAddress: { address: null, cityId: null },
    payment: {
      amountDue: null,
      imageProof: null,
      paymentMethodId: null,
      shippingFee: null
    },
    items: []
  })

  const [validateFields, setValidateFields] = useState<boolean>(false)

  const { data: userData } = useQuery(GetUser)
  const user: User = userData?.get_user || {}

  const { data: cartData } = useQuery(GetCart)
  const cart: Cart = cartData?.get_cart || {}

  const { data: cityData } = useQuery(GetCity, {
    skip: !args.deliveryAddress.cityId,
    variables: { _id: args.deliveryAddress.cityId }
  })
  const city: City = cityData?.get_city || {}

  const { data: paymentMethodData } = useQuery(GetPaymentMethod, {
    skip: !args.payment.paymentMethodId,
    variables: { _id: args.payment.paymentMethodId }
  })
  const paymentMethod: PaymentMethod = paymentMethodData?.get_payment_method || {}

  useEffect(() => {
    if (user?.deliveryAddress) {
      setArgs({
        ...args,
        deliveryAddress: {
          address: user?.deliveryAddress?.address,
          cityId: user?.deliveryAddress?.cityId
        }
      })
    }
  }, [user])

  const cartItems: CartItem[] = cart?.items?.map((item: CartItem) => {
    const { product, productVariant, quantity, totalPrice } = item

    return {
      productId: product?._id,
      productVariantId: productVariant?._id,
      quantity,
      totalPrice
    }
  })

  const [createMutation, createMutationState] = useMutation(mutation, {
    variables: correctArgs({
      ...args,
      items: cartItems,
      payment: {
        ...args.payment,
        amountDue: cart?.totalPrice,
        shippingFee: city?.shippingFee
      }
    }),
    onCompleted: () => {
      globalAny.updateCartQuantity()
      router.push('/orders/success')
    },
    onError: (error) => globalAny.setNotification(false, error.message)
  })

  return (
    <>
      {createMutationState.loading && <CircularProgress />}
      <Grid container>
        <Grid item xs={12} md={4} lg={4}>
          <Card>
            <CardContent>
              <OrderSummary cart={cart} city={city} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8} lg={8}>
          <Card>
            <CardContent>
              <Typography sx={{ marginBottom: 5 }} variant={'h2'}>
                {'Details'}
              </Typography>
              <Text
                args={args}
                error={validateFields}
                nestedProp={'address'}
                required={true}
                setArgs={setArgs}
                targetProp={'deliveryAddress'}
              />
              <CitiesSelect
                args={args}
                error={validateFields}
                required={true}
                setArgs={setArgs}
                targetProp={'deliveryAddress'}
              />
              <PaymentMethodsSelect
                args={args}
                error={validateFields}
                required={true}
                setArgs={setArgs}
                targetProp={'payment'}
              />
              {Object.keys(paymentMethod).length > 0 && (
                <Typography>
                  {`Note: Please transfer total amount due to ${paymentMethod?.details}`}
                </Typography>
              )}
              <ImageUploader
                alt={'Proof of Payment Transfer'}
                args={args}
                error={validateFields}
                label={'Upload Proof of Payment *'}
                nestedProp={'imageProof'}
                required={true}
                setArgs={setArgs}
                targetProp={'payment'}
              />
              <MutationButton
                disabled={createMutationState.loading}
                onClick={(): void => {
                  setValidateFields(true)
                  createMutation()
                }}
                title={'Confirm Payment'}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default CreateOrder
