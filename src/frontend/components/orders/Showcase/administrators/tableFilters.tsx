import { ReactElement, useState, useEffect } from 'react'
import { Box } from '@mui/material'
import { DateRange } from '../../../../../types/common/dateRange'
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
  const [dateRangeArgs, setDateRangeArgs] = useState<DateRange>({
    startDate: null,
    endDate: null,
    filterBy: null
  })

  useEffect(() => {
    setArgs({
      ...args,
      dateRange: {
        startDate: dateRangeArgs?.startDate,
        endDate: dateRangeArgs?.endDate,
        filterBy: dateRangeArgs?.filterBy
      }
    })
  }, [dateRangeArgs])

  return (
    <>
      <SelectField
        args={args}
        label={'Collection Method'}
        optionLabelProp={'label'}
        options={Object.keys(CollectionMethod).map((method) => {
          return { label: method, collectionMethod: method }
        })}
        setArgs={setArgs}
        targetProp={'collectionMethod'}
      />
      <SelectField
        args={args}
        label={'Order Status'}
        optionLabelProp={'label'}
        options={Object.keys(OrderStatus).map((status) => {
          return { label: status, status: status }
        })}
        setArgs={setArgs}
        targetProp={'status'}
      />
      <Box>
        <SelectField
          args={dateRangeArgs}
          label={'Filter Date Range by'}
          optionLabelProp={'label'}
          options={[
            { label: 'Created At Date', filterBy: DateRangeType.CREATED },
            { label: 'Updated At Date', filterBy: DateRangeType.UPDATED }
          ]}
          setArgs={setDateRangeArgs}
          targetProp={'filterBy'}
        />
        <DatePickerField
          args={dateRangeArgs}
          disabled={
            dateRangeArgs?.filterBy === null || dateRangeArgs?.filterBy == undefined
          }
          setArgs={setDateRangeArgs}
          targetProp={'startDate'}
        />
        <DatePickerField
          args={dateRangeArgs}
          disabled={
            dateRangeArgs?.filterBy === null || dateRangeArgs?.filterBy == undefined
          }
          setArgs={setDateRangeArgs}
          targetProp={'endDate'}
        />
      </Box>
    </>
  )
}

export default OrdersTableFilters
