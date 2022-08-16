import { mailer } from '../setup/mailer'

export const sendVerificationCode = async (
  verificationCode: string
): Promise<void> => {
  if (!verificationCode) return

  const params = {
    Destination: {
      CcAddresses: [],
      ToAddresses: ['chiangcaitlin2003@gmail.com']
    },
    Template: 'VERIFICATION_TEMPLATE',
    TemplateData: '{ verificationCode: verificationCode }',
    Source: 'estoree.services@gmail.com',
    ReplyToAddresses: []
  }

  const sendPromise = new mailer.SES({ apiVersion: '2010-12-01' })
    .sendEmail(params)
    .promise()

  sendPromise
    .then((data) => console.log(data.MessageId))
    .catch((err) => console.error(err, err.stack))
}
