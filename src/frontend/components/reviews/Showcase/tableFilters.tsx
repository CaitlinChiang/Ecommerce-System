import { ReactElement } from 'react'
import SelectField from '../../_common/SelectField'

const ReviewsTableFilters = ({
  args,
  setArgs
}: {
  args: any
  setArgs: React.Dispatch<React.SetStateAction<any>>
}): ReactElement => {
  return (
    <SelectField
      args={args}
      label={'Featured Status'}
      optionLabelProp={'label'}
      options={[
        { label: 'Featured Reviews', featured: true },
        { label: 'Non-Featured Reviews', featured: false }
      ]}
      setArgs={setArgs}
      targetProp={'featured'}
    />
  )
}

export default ReviewsTableFilters
