import { ReactElement } from 'react'
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
