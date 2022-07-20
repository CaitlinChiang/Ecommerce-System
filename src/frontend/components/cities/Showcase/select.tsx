import { ReactElement } from 'react'
import { useQuery } from '@apollo/client'
import { GetCities } from './query'
import { ObjectId } from 'mongodb'
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
  const { data } = useQuery(GetCities, {
    variables: {
      paginateData: { sortBy: 'name', sortDirection: SortDirection.ASC }
    }
  })

  const cities: City[] = data?.get_cities || []

  const cityOptions = cities?.map(
    (city: City): { label: string; cityId: ObjectId } => {
      return {
        label: city.name,
        cityId: city._id
      }
    }
  )

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
