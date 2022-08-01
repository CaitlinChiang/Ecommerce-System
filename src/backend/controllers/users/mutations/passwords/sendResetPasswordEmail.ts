const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../../../../../.env') })

export const sendResetPasswordEmail = async (
  verificationCode: string
): Promise<void> => {
  if (!verificationCode) return

  // FINISH LOGIC WITH MAILER

  return
}
