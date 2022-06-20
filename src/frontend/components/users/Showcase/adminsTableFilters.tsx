import { ReactElement } from 'react'
import SelectField from '../../_common/SelectField'

const AdminsTableFilters = ({
  setSpecificArgs,
  specificArgs
}: {
  setSpecificArgs: React.Dispatch<React.SetStateAction<any>>
  specificArgs: any
}): ReactElement => {
  return (
    <SelectField
      label={'Active Status'}
      optionLabelProperty={'label'}
      options={[
        { label: 'Active Users', active: true },
        { label: 'Non-Active Users', active: false }
      ]}
      setSpecificArgs={setSpecificArgs}
      specificArgs={specificArgs}
      targetProperty={'active'}
    />
  )
}

export default AdminsTableFilters
