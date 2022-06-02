import { ObjectId } from 'mongodb'
import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET

const jwtSettings = {
  expiresIn: '1h'
}

export const generateJWT = (_id: ObjectId): string => {
  return jwt.sign({ _id }, secret, jwtSettings)
}
