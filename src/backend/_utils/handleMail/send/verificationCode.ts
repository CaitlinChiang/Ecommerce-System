const AWS = require('../setup/mailer')

export const sendVerificationCode = async (
  email: string,
  verificationCode: string
): Promise<void> => {
  if (!verificationCode || !email) return

  const args = {
    Destination: {
      CcAddresses: [],
      ToAddresses: [email]
    },
    Template: 'VERIFICATION_CODE_TEMPLATE',
    TemplateData: '{ "verificationCode": verificationCode }',
    Source: 'estoree.services@gmail.com',
    ReplyToAddresses: []
  }

  const sendEmail = new AWS.SES({ apiVersion: '2010-12-01' })
    .sendTemplatedEmail(args)
    .promise()

  sendEmail
    .then((data) => console.log(data))
    .catch((err) => console.error(err, err.stack))
}
