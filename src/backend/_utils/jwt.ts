import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb'

const SECRET_KEY = process.env.JWT_SECRET

const jwtSettings = {
  expiresIn: '10h'
}

export const generateJWT = (_id: ObjectId): string => {
  const stringId = String(_id)
  return jwt.sign({ stringId }, SECRET_KEY, jwtSettings)
}

export const verifyJWT = (
  token: string
): {
  _id: string
  iat: number
  exp: number
} => {
  try {
    return jwt.verify(token, SECRET_KEY) as {
      _id: string
      iat: number
      exp: number
    }
  } catch (err) {
    console.log(err)
    return
  }
}
