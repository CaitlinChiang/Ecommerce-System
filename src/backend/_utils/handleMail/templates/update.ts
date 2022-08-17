const AWS = require('../../setup/aws-ses')

// CHANGE IMPORT DEPENDING ON WHICH TEMPLATE IS BEING UPDATED
import { verificationCodeTemplate } from './htmlTemplates/verificationCode'

export const updateTemplate = async (): Promise<void> => {
  const updateTemplate = new AWS.SES({ apiVersion: '2010-12-01' })
    .updateTemplate({ Template: verificationCodeTemplate })
    .promise()

  updateTemplate
    .then(() => console.log('Template Successfully Updated!'))
    .catch((err) => console.error(err, err.stack))
}
