import { ReactElement } from 'react'
import SelectField from '../../_common/SelectField'
import ProductCategoriesSelect from '../../productCategories/Showcase/select'

const ProductsTableFilters = ({
  setSpecificArgs,
  specificArgs
}: {
  setSpecificArgs: React.Dispatch<React.SetStateAction<any>>
  specificArgs: any
}): ReactElement => {
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
      {/* INSERT LOGIC FOR EXPIRATION / CREATED AT DATE FILTERING */}
      {/* INSERT LOGIC FOR STOCK QUANTITY FILTERING */}
    </>
  )
}

export default ProductsTableFilters
