import { ReactElement, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GetCity } from '../../cities/View/query'
import { GetPaymentMethod } from '../../paymentMethods/View/query'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import { Button, Container, Typography } from '@mui/material'
import { City } from '../../../../types/city'
import { PaymentMethod } from '../../../../types/paymentMethod'
import { CollectionMethod } from '../../../_enums/collectionMethod'
import OrderSummary from './orderSummary'
import CitiesSelect from '../../cities/View/select'
import PaymentMethodsSelect from '../../paymentMethods/View/select'
import SelectField from '../../_common/SelectField'
import Text from '../../_common/TextField'
import ImageUploader from '../../_common/ImageUploader'
import OrderSuccess from './orderSuccess'

const globalAny: any = global

const CreateOrder = (): ReactElement => {
  const router = useRouter()

  const [args, setArgs] = useState<any>({
    address: null,
    cityId: null,
    collectionMethod: null,
    imageProof: null,
    items: [],
    paymentMethodId: null
  })
  const [validateFields, setValidateFields] = useState<boolean>(false)
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false)

  const { data: cityData } = useQuery(GetCity, { variables: { _id: args?.cityId } })
  const { data: paymentMethodData } = useQuery(GetPaymentMethod, {
    variables: { _id: args?.paymentMethodId }
  })

  const city: City = cityData?.get_city || {}
  const paymentMethod: PaymentMethod = paymentMethodData?.get_payment_method || {}

  const [createMutation, createMutationState] = useMutation(mutation, {
    variables: {
      collectionMethod: args?.collectionMethod,
      deliveryAddress: { address: args?.address, cityId: args?.cityId },
      items: args?.items,
      payment: {
        amountDue: args?.payment,
        imageProof: args?.imageProof,
        paymentMethodId: args?.paymentMethodId,
        shippingFee: city?.shippingFee
      }
    },
    onCompleted: () => {
      globalAny.setNotification(true, 'Order successfully placed!')
      setOrderSuccess(true)
    },
    onError: (error) => globalAny.setNotification(false, error.message)
  })

  return (
    <>
      <Container>
        <OrderSummary />
      </Container>
      <Container>
        <SelectField
          args={args}
          error={validateFields}
          label={'Collection Method'}
          options={Object.keys(CollectionMethod).map((method) => {
            return { label: method, collectionMethod: method }
          })}
          required={true}
          setArgs={setArgs}
          targetProp={'collectionMethod'}
        />
        {args?.collectionMethod === CollectionMethod.DELIVERY && (
          <>
            <Text
              args={args}
              error={validateFields}
              required={true}
              setArgs={setArgs}
              targetProp={'address'}
            />
            <CitiesSelect
              args={args}
              error={validateFields}
              required={true}
              setArgs={setArgs}
            />
          </>
        )}
        <PaymentMethodsSelect
          args={args}
          error={validateFields}
          required={true}
          setArgs={setArgs}
        />
        {paymentMethod && (
          <Typography>
            {`Note: Please transfer total amount due to ${paymentMethod?.details}`}
          </Typography>
        )}
        <ImageUploader
          alt={'Proof of Payment Transfer'}
          args={args}
          error={validateFields}
          required={true}
          setArgs={setArgs}
          targetProp={'imageProof'}
        />
        <Button
          disabled={createMutationState.loading}
          onClick={(): void => {
            router.push('/shop')
          }}
        >
          {'Return to Shop'}
        </Button>
        <Button
          disabled={createMutationState.loading}
          onClick={(): void => {
            setValidateFields(true)
            createMutation()
          }}
        >
          {'Confirm Payment'}
        </Button>
      </Container>
      {orderSuccess && <OrderSuccess />}
    </>
  )
}

export default CreateOrder
