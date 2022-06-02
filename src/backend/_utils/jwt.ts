import { ObjectId } from 'mongodb'
import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.JWT_SECRET

const jwtSettings = {
  expiresIn: '10h'
}

export const generateJWT = (_id: ObjectId): string => {
  return jwt.sign({ _id }, SECRET_KEY, jwtSettings)
}

export const verifyJWT = (
  token: string
): {
  _id: ObjectId
  iat: number
  exp: number
} => {
  try {
    return jwt.verify(token, SECRET_KEY) as {
      _id: ObjectId
      iat: number
      exp: number
    }
  } catch {
    return
  }
}
