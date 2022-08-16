const AWS = require('aws-sdk')

export const mailer = AWS.config.update({ region: 'ap-south-1' })
