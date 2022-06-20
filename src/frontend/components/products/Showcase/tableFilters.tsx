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
  setSpecificArgs,
  specificArgs
}: {
  setSpecificArgs: React.Dispatch<React.SetStateAction<any>>
  specificArgs: any
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
    setSpecificArgs({
      ...specificArgs,
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
        label={'Featured Status'}
        optionLabelProperty={'label'}
        options={[
          { label: 'Featured Products', featured: true },
          { label: 'Non-Featured Products', featured: false }
        ]}
        setSpecificArgs={setSpecificArgs}
        specificArgs={specificArgs}
        targetProperty={'featured'}
      />
      <SelectField
        label={'Show Public Status'}
        optionLabelProperty={'label'}
        options={[
          { label: 'Public Products', showPublic: true },
          { label: 'Private Products', showPublic: false }
        ]}
        setSpecificArgs={setSpecificArgs}
        specificArgs={specificArgs}
        targetProperty={'showPublic'}
      />
      <ProductCategoriesSelect
        multiple={true}
        setSpecificArgs={setSpecificArgs}
        specificArgs={specificArgs}
      />
      <Box>
        <SelectField
          label={'Filter Date Range by'}
          optionLabelProperty={'label'}
          options={[
            { label: 'Created At Date', filterBy: DateRangeType.CREATED },
            { label: 'Expiration Date', filterBy: DateRangeType.EXPIRATION }
          ]}
          setSpecificArgs={setDateRangeArgs}
          specificArgs={dateRangeArgs}
          targetProperty={'filterBy'}
        />
        <DatePickerField
          disabled={
            dateRangeArgs?.filterBy === null || dateRangeArgs?.filterBy == undefined
          }
          setSpecificArgs={setDateRangeArgs}
          specificArgs={dateRangeArgs}
          targetProperty={'startDate'}
        />
        <DatePickerField
          disabled={
            dateRangeArgs?.filterBy === null || dateRangeArgs?.filterBy == undefined
          }
          setSpecificArgs={setDateRangeArgs}
          specificArgs={dateRangeArgs}
          targetProperty={'endDate'}
        />
      </Box>
      <Box>
        <SelectField
          label={'Filter Stock Quantity Operator'}
          optionLabelProperty={'label'}
          options={[
            { label: 'ABOVE', operator: StockQuantityOperator.ABOVE },
            { label: 'BELOW', operator: StockQuantityOperator.BELOW },
            { label: 'BETWEEN', operator: StockQuantityOperator.BETWEEN },
            { label: 'EQUAL TO', operator: StockQuantityOperator.EQUAL }
          ]}
          setSpecificArgs={setStockQuantityArgs}
          specificArgs={stockQuantityArgs}
          targetProperty={'operator'}
        />
        <NumberField
          disabled={
            stockQuantityArgs?.operator === null ||
            stockQuantityArgs?.operator == undefined
          }
          label={
            stockQuantityArgs?.operator === StockQuantityOperator.BETWEEN
              ? 'Value 1'
              : 'Value'
          }
          setSpecificArgs={setStockQuantityArgs}
          specificArgs={stockQuantityArgs}
          targetProperty={'value1'}
        />
        {stockQuantityArgs?.operator === StockQuantityOperator.BETWEEN && (
          <>
            <Typography>{'and'}</Typography>
            <NumberField
              label={'Value 2'}
              setSpecificArgs={setStockQuantityArgs}
              specificArgs={stockQuantityArgs}
              targetProperty={'value2'}
            />
          </>
        )}
      </Box>
    </>
  )
}

export default ProductsTableFilters
