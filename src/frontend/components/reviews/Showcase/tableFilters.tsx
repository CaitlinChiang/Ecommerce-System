import { ReactElement } from 'react'
import SelectField from '../../_common/SelectField'

const ReviewsTableFilters = ({
  setSpecificArgs,
  specificArgs
}: {
  setSpecificArgs: React.Dispatch<React.SetStateAction<any>>
  specificArgs: any
}): ReactElement => {
  return (
    <SelectField
      label={'Featured Status'}
      optionLabelProperty={'label'}
      options={[
        { label: 'Featured Reviews', featured: true },
        { label: 'Non-Featured Reviews', featured: false }
      ]}
      setSpecificArgs={setSpecificArgs}
      specificArgs={specificArgs}
      targetProperty={'featured'}
    />
  )
}

export default ReviewsTableFilters
