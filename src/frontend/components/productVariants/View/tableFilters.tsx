import { ReactElement } from 'react'
import { Grid } from '@mui/material'
import { DateRangeType } from '../../../_enums/dateRangeType'
import { StockQuantityOperator } from '../../../_enums/stockQuantityOperator'
import SelectField from '../../_common/SelectField'
import DatePickerField from '../../_common/DatePickerField'
import NumberField from '../../_common/NumberField'

const ProductVariantsTableFilters = ({
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
        label={'Show Public Status'}
        options={[
          { label: 'Public Products', showPublic: true },
          { label: 'Private Products', showPublic: false }
        ]}
        setArgs={setArgs}
        targetProp={'showPublic'}
      />
      <SelectField
        args={args}
        label={'Discount Status'}
        options={[
          { label: 'Products with Discount', discount: true },
          { label: 'Products without Discount', discount: false }
        ]}
        setArgs={setArgs}
        targetProp={'discount'}
      />
      <Grid container spacing={1}>
        <Grid item xs={3.5} md={3.5} lg={3.5}>
          <SelectField
            args={args}
            label={'Filter Date Range by'}
            nestedProp={'filterBy'}
            options={[
              { label: 'Created At Date', filterBy: DateRangeType.CREATED },
              { label: 'Expiration Date', filterBy: DateRangeType.EXPIRATION }
            ]}
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
            nestedProp={'startDate'}
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
            nestedProp={'endDate'}
            setArgs={setArgs}
            targetProp={'dateRange'}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={3.5} md={3.5} lg={3.5}>
          <SelectField
            args={args}
            label={'Filter Stock Quantity'}
            nestedProp={'operator'}
            options={[
              { label: 'ABOVE', operator: StockQuantityOperator.ABOVE },
              { label: 'BELOW', operator: StockQuantityOperator.BELOW },
              { label: 'BETWEEN', operator: StockQuantityOperator.BETWEEN },
              { label: 'EQUAL TO', operator: StockQuantityOperator.EQUAL }
            ]}
            setArgs={setArgs}
            targetProp={'stockQuantity'}
          />
        </Grid>
        <Grid item xs={3.5} md={2} lg={2}>
          <NumberField
            args={args}
            disabled={
              args.stockQuantity?.operator === null ||
              args.stockQuantity?.operator == undefined
            }
            label={
              args.stockQuantity?.operator === StockQuantityOperator.BETWEEN
                ? 'Value 1'
                : 'Value'
            }
            nestedProp={'value1'}
            setArgs={setArgs}
            targetProp={'stockQuantity'}
          />
        </Grid>
        <Grid item xs={3.5} md={2} lg={2}>
          {args.stockQuantity?.operator === StockQuantityOperator.BETWEEN && (
            <NumberField
              args={args}
              nestedProp={'value2'}
              setArgs={setArgs}
              targetProp={'stockQuantity'}
            />
          )}
        </Grid>
      </Grid>
    </>
  )
}

export default ProductVariantsTableFilters
