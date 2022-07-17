import { ReactElement, useState } from 'react'
import { useQuery } from '@apollo/client'
import { querySingular } from '../../paymentMethods/Showcase/query'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import { Button, Container, Typography } from '@mui/material'
import { CollectionMethod } from '../../../_enums/collectionMethod'
import OrderSummary from './orderSummary'
import CitiesSelect from '../../../components/cities/Showcase/select'
import PaymentMethodsSelect from '../../../components/paymentMethods/Showcase/select'
import SelectField from '../../../components/_common/SelectField'
import Text from '../../_common/TextField'
import ImageUploader from '../../_common/ImageUploader'
import Notification from '../../_common/Notification'

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
  const [notification, setNotification] = useState<any>({
    message: null,
    success: null
  })

  const { data } = useQuery(querySingular, {
    variables: { _id: args?.paymentMethodId }
  })

  const paymentMethod = data?.get_payment_method || {}

  const [createMutation, createMutationState] = useMutation(mutation, {
    variables: {
      collectionMethod: args?.collectionMethod,
      deliveryAddress: { address: args?.address, cityId: args?.cityId },
      items: args?.items,
      payment: {
        amountDue: args?.payment,
        imageProof: args?.imageProof,
        paymentMethodId: args?.paymentMethodId
      }
    },
    onCompleted: () => {
      setNotification({
        message: 'Order successfully placed!',
        success: true
      })
      router.push('/')
    },
    onError: (error) => setNotification({ message: error.message, success: false })
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
        <PaymentMethodsSelect
          args={args}
          error={validateFields}
          required={true}
          setArgs={setArgs}
        />
        {paymentMethod && (
          <Typography>
            {'Note: Please transfer total amount due to ' + paymentMethod?.details}
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
          onClick={() => router.push('/shop')}
          disabled={createMutationState.loading}
        >
          {'Return to Shop'}
        </Button>
        <Button
          onClick={() => {
            setValidateFields(true)
            createMutation()
          }}
          disabled={createMutationState.loading}
        >
          {'Confirm Payment'}
        </Button>
      </Container>
      <Notification message={notification.message} success={notification.success} />
    </>
  )
}

export default CreateOrder
