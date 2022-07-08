import { ReactElement } from 'react'
import { useQuery } from '@apollo/client'
import { queryMultiple } from './query'
import { City } from '../../../../types/city'
import { SortDirection } from '../../../_enums/sortDirection'
import SelectField from '../../../components/_common/SelectField'

const CitiesSelect = ({
  args,
  error,
  required,
  setArgs
}: {
  args: any
  error?: boolean
  required?: boolean
  setArgs: React.Dispatch<React.SetStateAction<any>>
}): ReactElement => {
  const { data } = useQuery(queryMultiple, {
    variables: {
      paginateData: { sortBy: 'name', sortDirection: SortDirection.ASC }
    }
  })

  const cities = data?.get_cities || []

  const cityOptions = cities?.map((city: City) => {
    return {
      label: city.name,
      cityId: city._id
    }
  })

  return (
    <SelectField
      args={args}
      error={error}
      label={'City'}
      options={cityOptions}
      required={required}
      setArgs={setArgs}
      targetProp={'cityId'}
    />
  )
}

export default CitiesSelect
