import { ObjectId } from 'mongodb'
import { User } from '../../../types/user'
import { generateJWT, verifyJWT } from './jwt'

export default async (headers, database): Promise<User | null> => {
  if (!headers.accesstoken) return

  const decoded = await verifyJWT(headers.accesstoken)
  if (!decoded) return

  const user: User = await database.users.findOne({
    _id: new ObjectId(decoded._id)
  })

  const minutesRemaining = (decoded.exp - new Date().getTime() / 1000) / 60
  if (minutesRemaining <= 5) {
    user.token = await generateJWT(new ObjectId(decoded._id))
  }

  return user
}
