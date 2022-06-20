import { ReactElement } from 'react'
import SelectField from '../../_common/SelectField'

const AdminsTableFilters = ({
  args,
  setArgs
}: {
  args: any
  setArgs: React.Dispatch<React.SetStateAction<any>>
}): ReactElement => {
  return (
    <SelectField
      args={args}
      label={'Active Status'}
      optionLabelProp={'label'}
      options={[
        { label: 'Active Users', active: true },
        { label: 'Non-Active Users', active: false }
      ]}
      setArgs={setArgs}
      targetProp={'active'}
    />
  )
}

export default AdminsTableFilters
