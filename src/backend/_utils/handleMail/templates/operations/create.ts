const AWS = require('../../setup/aws-ses')

// CHANGE IMPORT DEPENDING ON WHICH TEMPLATE IS BEING CREATED
import { paymentReceiptTemplate } from '../paymentReceipt'

export const createTemplate = async (): Promise<void> => {
  const createTemplate = new AWS.SES({ apiVersion: '2010-12-01' })
    .createTemplate({ Template: paymentReceiptTemplate })
    .promise()

  createTemplate
    .then(() => console.log('Template Successfully Created!'))
    .catch((err) => console.error(err, err.stack))
}
