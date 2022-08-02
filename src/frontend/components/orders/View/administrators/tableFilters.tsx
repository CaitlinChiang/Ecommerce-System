import { ReactElement } from 'react'
import { Box } from '@mui/material'
import { DateRangeType } from '../../../../_enums/dateRangeType'
import { OrderStatus } from '../../../../_enums/orderStatus'
import SelectField from '../../../_common/SelectField'
import DatePickerField from '../../../_common/DatePickerField'
import CitiesSelect from '../../../cities/View/select'

const OrdersTableFilters = ({
  args,
  setArgs
}: {
  args: any
  setArgs: React.Dispatch<React.SetStateAction<any>>
}): ReactElement => {
  return (
    <>
      <CitiesSelect args={args} setArgs={setArgs} />
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
