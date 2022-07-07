import { ReactElement } from 'react'
import { Box, Typography } from '@mui/material'
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
  return (
    <>
      <SelectField
        args={args}
        label={'Featured Status'}
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
      <ProductCategoriesSelect args={args} multiple={true} setArgs={setArgs} />
      <Box>
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
      <Box>
        <SelectField
          args={args}
          label={'Filter Stock Quantity Operator'}
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
        {args.stockQuantity?.operator === StockQuantityOperator.BETWEEN && (
          <>
            <Typography>{'and'}</Typography>
            <NumberField
              args={args}
              nestedProp={'value2'}
              setArgs={setArgs}
              targetProp={'stockQuantity'}
            />
          </>
        )}
      </Box>
    </>
  )
}

export default ProductsTableFilters
