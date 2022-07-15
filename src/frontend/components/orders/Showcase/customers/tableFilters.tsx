import { ReactElement } from 'react'
import { CollectionMethod } from '../../../../_enums/collectionMethod'
import { OrderStatus } from '../../../../_enums/orderStatus'
import SelectField from '../../../_common/SelectField'

const OrdersTableFilters = ({
  args,
  setArgs
}: {
  args: any
  setArgs: React.Dispatch<React.SetStateAction<any>>
}): ReactElement => {
  return (
    <>
      <SelectField
        args={args}
        label={'Collection Method'}
        options={Object.keys(CollectionMethod).map((method) => {
          return { label: method, collectionMethod: method }
        })}
        setArgs={setArgs}
        targetProp={'collectionMethod'}
      />
      <SelectField
        args={args}
        label={'Order Status'}
        multiple={true}
        options={Object.keys(OrderStatus).map((status) => {
          return { label: status, statuses: status }
        })}
        setArgs={setArgs}
        targetProp={'statuses'}
      />
    </>
  )
}

export default OrdersTableFilters
