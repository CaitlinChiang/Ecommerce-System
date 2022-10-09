import { ReactElement } from 'react'
import { Grid } from '@mui/material'
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
      <Grid container spacing={1}>
        <Grid item xs={3.5} md={3.5} lg={3.5}>
          <SelectField
            args={args}
            label={'Filter Date Range by'}
            nestedProp={'filterBy'}
            options={[
              { label: 'Created At Date', filterBy: DateRangeType.CREATED },
              { label: 'Updated At Date', filterBy: DateRangeType.UPDATED }
            ]}
            required={true}
            setArgs={setArgs}
            targetProp={'dateRange'}
          />
        </Grid>
        <Grid item xs={3.5} md={2} lg={2}>
          <DatePickerField
            args={args}
            disabled={
              args.dateRange?.filterBy === null ||
              args.dateRange?.filterBy == undefined
            }
            fallbackValue={new Date(Date.now() - 6096e5)}
            nestedProp={'startDate'}
            required={true}
            setArgs={setArgs}
            targetProp={'dateRange'}
          />
        </Grid>
        <Grid item xs={3.5} md={2} lg={2}>
          <DatePickerField
            args={args}
            disabled={
              args.dateRange?.filterBy === null ||
              args.dateRange?.filterBy == undefined
            }
            fallbackValue={new Date()}
            nestedProp={'endDate'}
            required={true}
            setArgs={setArgs}
            targetProp={'dateRange'}
          />
        </Grid>
      </Grid>
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
      <CitiesSelect args={args} setArgs={setArgs} />
    </>
  )
}

export default OrdersTableFilters
