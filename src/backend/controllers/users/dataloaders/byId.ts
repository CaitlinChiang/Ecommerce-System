import { ObjectId } from 'mongodb'
import { Database } from '../../../../types/setup/database'
import { User } from '../../../../types/user'

export default async (db: Database, ids: ObjectId[]): Promise<User[]> => {
  const users: User[] = await db.users.find({ _id: { $in: ids } }).toArray()

  const usersById: { [id: string]: User } = {}

  users.forEach((user: User): void => {
    usersById[String(user._id)] = user
  })

  return ids.map((id: ObjectId): User => usersById[String(id)])
}
