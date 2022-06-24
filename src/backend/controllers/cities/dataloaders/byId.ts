import { ObjectId } from 'mongodb'
import { Database } from '../../../../types/setup/database'
import { City } from '../../../../types/city'

export default async (db: Database, ids: ObjectId[]): Promise<City[]> => {
  const cities: City[] = await db.cities.find({ _id: { $in: ids } }).toArray()

  const citiesById: { [id: string]: City } = {}

  cities.forEach((city: City): void => {
    citiesById[String(city._id)] = city
  })

  return ids.map((id: ObjectId): City => citiesById[String(id)])
}
