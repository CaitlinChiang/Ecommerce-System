import { ReactElement } from 'react'
import SelectField from '../../_common/SelectField'

const ProductCategoriesTableFilters = ({
  args,
  setArgs
}: {
  args: any
  setArgs: React.Dispatch<React.SetStateAction<any>>
}): ReactElement => {
  return (
    <SelectField
      args={args}
      label={'Show Public Status'}
      options={[
        { label: 'Public Categories', showPublic: true },
        { label: 'Private Categories', showPublic: false }
      ]}
      setArgs={setArgs}
      targetProp={'showPublic'}
    />
  )
}

export default ProductCategoriesTableFilters
