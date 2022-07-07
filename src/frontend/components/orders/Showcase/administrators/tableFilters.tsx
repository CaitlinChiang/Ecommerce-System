import { ReactElement } from 'react'
import { Box } from '@mui/material'
import { CollectionMethod } from '../../../../_enums/collectionMethod'
import { DateRangeType } from '../../../../_enums/dateRangeType'
import { OrderStatus } from '../../../../_enums/orderStatus'
import SelectField from '../../../_common/SelectField'
import DatePickerField from '../../../_common/DatePickerField'

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
        options={Object.keys(OrderStatus).map((status) => {
          return { label: status, status: status }
        })}
        setArgs={setArgs}
        targetProp={'status'}
      />
      <Box>
        <SelectField
          args={args}
          label={'Filter Date Range by'}
          nestedProp={'filterBy'}
          options={[
            { label: 'Created At Date', filterBy: DateRangeType.CREATED },
            { label: 'Updated At Date', filterBy: DateRangeType.UPDATED }
          ]}
          setArgs={setArgs}
          targetProp={'dateRange'}
        />
        <DatePickerField
          args={args}
          disabled={
            args.dateRange?.filterBy === null ||
            args.dateRange?.filterBy == undefined
          }
          nestedProp={'startDate'}
          setArgs={setArgs}
          targetProp={'dateRange'}
        />
        <DatePickerField
          args={args}
          disabled={
            args.dateRange?.filterBy === null ||
            args.dateRange?.filterBy == undefined
          }
          nestedProp={'endDate'}
          setArgs={setArgs}
          targetProp={'dateRange'}
        />
      </Box>
    </>
  )
}

export default OrdersTableFilters
