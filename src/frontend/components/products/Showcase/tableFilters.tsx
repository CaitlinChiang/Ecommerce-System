import { ReactElement, useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { DateRange } from '../../../../types/common/dateRange'
import { StockQuantity } from '../../../../types/common/stockQuantity'
import { DateRangeType } from '../../../_enums/dateRangeType'
import { StockQuantityOperator } from '../../../_enums/stockQuantityOperator'
import SelectField from '../../_common/SelectField'
import ProductCategoriesSelect from '../../productCategories/Showcase/select'
import DatePickerField from '../../_common/DatePickerField'
import NumberField from '../../_common/NumberField'

const ProductsTableFilters = ({
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
  const [stockQuantityArgs, setStockQuantityArgs] = useState<StockQuantity | any>({
    operator: null,
    value1: null,
    value2: null
  })

  useEffect(() => {
    setArgs({
      ...args,
      dateRange: {
        startDate: dateRangeArgs?.startDate,
        endDate: dateRangeArgs?.endDate,
        filterBy: dateRangeArgs?.filterBy
      },
      stockQuantity: {
        operator: stockQuantityArgs?.operator,
        value1: stockQuantityArgs?.value1,
        value2: stockQuantityArgs?.value2
      }
    })
  }, [dateRangeArgs, stockQuantityArgs])

  return (
    <>
      <SelectField
        args={args}
        label={'Featured Status'}
        optionLabelProp={'label'}
        options={[
          { label: 'Featured Products', featured: true },
          { label: 'Non-Featured Products', featured: false }
        ]}
        setArgs={setArgs}
        targetProp={'featured'}
      />
      <SelectField
        args={args}
        label={'Show Public Status'}
        optionLabelProp={'label'}
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
        optionLabelProp={'label'}
        options={[
          { label: 'Products with Discount', discount: true },
          { label: 'Products without Discount', discount: false }
        ]}
        setArgs={setArgs}
        targetProp={'discount'}
      />
      <ProductCategoriesSelect args={args} multiple={true} setArgs={setArgs} />
      <Box>
        <SelectField
          args={dateRangeArgs}
          label={'Filter Date Range by'}
          optionLabelProp={'label'}
          options={[
            { label: 'Created At Date', filterBy: DateRangeType.CREATED },
            { label: 'Expiration Date', filterBy: DateRangeType.EXPIRATION }
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
      <Box>
        <SelectField
          args={stockQuantityArgs}
          label={'Filter Stock Quantity Operator'}
          optionLabelProp={'label'}
          options={[
            { label: 'ABOVE', operator: StockQuantityOperator.ABOVE },
            { label: 'BELOW', operator: StockQuantityOperator.BELOW },
            { label: 'BETWEEN', operator: StockQuantityOperator.BETWEEN },
            { label: 'EQUAL TO', operator: StockQuantityOperator.EQUAL }
          ]}
          setArgs={setStockQuantityArgs}
          targetProp={'operator'}
        />
        <NumberField
          args={stockQuantityArgs}
          disabled={
            stockQuantityArgs?.operator === null ||
            stockQuantityArgs?.operator == undefined
          }
          label={
            stockQuantityArgs?.operator === StockQuantityOperator.BETWEEN
              ? 'Value 1'
              : 'Value'
          }
          setArgs={setStockQuantityArgs}
          targetProp={'value1'}
        />
        {stockQuantityArgs?.operator === StockQuantityOperator.BETWEEN && (
          <>
            <Typography>{'and'}</Typography>
            <NumberField
              args={stockQuantityArgs}
              label={'Value 2'}
              setArgs={setStockQuantityArgs}
              targetProp={'value2'}
            />
          </>
        )}
      </Box>
    </>
  )
}

export default ProductsTableFilters
