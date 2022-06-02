import { ObjectId } from 'mongodb'
import jwt from 'jsonwebtoken'
import { AuthenticationError } from 'apollo-server-express'

const SECRET_KEY = process.env.JWT_SECRET

const jwtSettings = {
  expiresIn: '1h'
}

export const generateJWT = (_id: ObjectId): string => {
  return jwt.sign({ _id }, SECRET_KEY, jwtSettings)
}

export const verifyJWT = (context) => {
  const authHeader = context.req.headers.authorization
  if (!authHeader) throw new Error('Authentication header must be provided.')

  const token = authHeader.split('Bearer ')[1]
  if (!token) throw new Error ("Authentication token must be 'Bearer [token].")

  try {
    return jwt.verify(token, SECRET_KEY)
  } catch (err) {
    throw new AuthenticationError('Invalid / Expired Token.')
  }
}
