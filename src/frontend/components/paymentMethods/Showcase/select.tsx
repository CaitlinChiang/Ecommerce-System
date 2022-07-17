import { ReactElement } from 'react'
import { useQuery } from '@apollo/client'
import { queryMultiple } from './query'
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
  const { data } = useQuery(queryMultiple, {
    variables: {
      paginateData: { sortBy: 'name', sortDirection: SortDirection.ASC }
    }
  })

  const paymentMethods = data?.get_payment_methods || []

  const paymentMethodOptions = paymentMethods?.map(
    (paymentMethod: PaymentMethod) => {
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
