import { ReactElement, useState, useEffect } from 'react'
import { Box } from '@mui/material'
import { DateRange } from '../../../../types/common/dateRange'
import { StockQuantity } from '../../../../types/common/stockQuantity'
import { DateRangeType } from '../../../_enums/dateRangeType'
import { StockQuantityOperator } from '../../../_enums/stockQuantityOperator'
import SelectField from '../../_common/SelectField'
import ProductCategoriesSelect from '../../productCategories/Showcase/select'
import DatePickerField from '../../_common/DatePickerField'

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
  const [stockQuantityArgs, setStockQuantityArgs] = useState<StockQuantity>({
    operator: StockQuantityOperator.ABOVE,
    value1: 0,
    value2: 0
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
          dateRangeArgs={dateRangeArgs}
          disabled={dateRangeArgs?.filterBy === null}
          setDateRangeArgs={setDateRangeArgs}
          targetProperty={'startDate'}
        />
        <DatePickerField
          dateRangeArgs={dateRangeArgs}
          disabled={dateRangeArgs?.filterBy === null}
          setDateRangeArgs={setDateRangeArgs}
          targetProperty={'endDate'}
        />
      </Box>
      {/* INSERT LOGIC FOR STOCK QUANTITY FILTERING */}
    </>
  )
}

export default ProductsTableFilters
