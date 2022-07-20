import { ReactElement } from 'react'
import { useQuery } from '@apollo/client'
import { GetPaymentMethods } from './query'
import { ObjectId } from 'mongodb'
import { PaymentMethod } from '../../../../types/paymentMethod'
import { SortDirection } from '../../../_enums/sortDirection'
import SelectField from '../../../components/_common/SelectField'

const PaymentMethodsSelect = ({
  args,
  error,
  required,
  setArgs
}: {
  args: any
  error?: boolean
  required?: boolean
  setArgs: React.Dispatch<React.SetStateAction<any>>
}): ReactElement => {
  const { data } = useQuery(GetPaymentMethods, {
    variables: {
      paginateData: { sortBy: 'name', sortDirection: SortDirection.ASC }
    }
  })

  const paymentMethods: PaymentMethod[] = data?.get_payment_methods || []

  const paymentMethodOptions = paymentMethods?.map(
    (paymentMethod: PaymentMethod): { label: string; paymentMethodId: ObjectId } => {
      return {
        label: paymentMethod.name,
        paymentMethodId: paymentMethod._id
      }
    }
  )

  return (
    <SelectField
      args={args}
      error={error}
      label={'Payment Method'}
      options={paymentMethodOptions}
      required={required}
      setArgs={setArgs}
      targetProp={'paymentMethodId'}
    />
  )
}

export default PaymentMethodsSelect
