const AWS = require('../../setup/aws-ses')

export const deleteTemplate = async (): Promise<void> => {
  const deleteTemplate = new AWS.SES({ apiVersion: '2010-12-01' })
    // CHANGE NAME DEPENDING ON WHICH TEMPLATE IS BEING DELETED
    .deleteTemplate({ TemplateName: 'VERIFICATION_TEMPLATE' })
    .promise()

  deleteTemplate
    .then(() => console.log('Template Successfully Deleted!'))
    .catch((err) => console.error(err, err.stack))
}
