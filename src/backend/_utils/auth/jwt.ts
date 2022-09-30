import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb'
import { JWTArgs } from '../../../types/user'

const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../../../.env') })

export const generateJWT = (_id: ObjectId): string => {
  const stringId = String(_id)
  return jwt.sign({ _id: stringId }, process.env.JWT_SECRET, { expiresIn: '10h' })
}

export const verifyJWT = (token: string): JWTArgs => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET) as JWTArgs
  } catch (err) {
    return
  }
}
