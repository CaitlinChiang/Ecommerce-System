import { ReactElement } from 'react'
import { useQuery } from '@apollo/client'
import { GetPaymentMethods } from './query'
import { ObjectId } from 'mongodb'
import { PaymentMethod } from '../../../../types/paymentMethod'
import { SortDirection } from '../../../_enums/sortDirection'
import SelectField from '../../_common/SelectField'

const PaymentMethodsSelect = ({
  args,
  error,
  required,
  setArgs,
  targetProp
}: {
  args: any
  error?: boolean
  required?: boolean
  setArgs: React.Dispatch<React.SetStateAction<any>>
  targetProp?: string
}): ReactElement => {
  const { data, loading } = useQuery(GetPaymentMethods, {
    variables: { paginateData: { sortBy: 'name', sortDirection: SortDirection.ASC } }
  })
  const paymentMethods: PaymentMethod[] = data?.get_payment_methods || []

  const paymentMethodOptions = paymentMethods?.map(
    (paymentMethod: PaymentMethod): { label: string; paymentMethodId: ObjectId } => {
      return { label: paymentMethod.name, paymentMethodId: paymentMethod._id }
    }
  )

  if (loading) return

  return (
    <SelectField
      args={args}
      error={error}
      label={'Payment Method'}
      nestedProp={targetProp ? 'paymentMethodId' : null}
      options={paymentMethodOptions}
      required={required}
      setArgs={setArgs}
      targetProp={targetProp || 'paymentMethodId'}
    />
  )
}

export default PaymentMethodsSelect
