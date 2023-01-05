export const paymentReceiptTemplate = {
  TemplateName: 'PAYMENT_RECEIPT_TEMPLATE',
  SubjectPart: 'Payment Receipt for Order {{ orderId }}',
  HtmlPart:
    '<!doctype html>\r\n<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">\r\n\r\n<head>\r\n  <title>\r\n  </title>\r\n  <!--[if !mso]><!-->\r\n  <meta http-equiv="X-UA-Compatible" content="IE=edge">\r\n  <!--<![endif]-->\r\n  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">\r\n  <meta name="viewport" content="width=device-width, initial-scale=1">\r\n  <style type="text/css">\r\n    #outlook a {\r\n      padding: 0;\r\n    }\r\n\r\n    body {\r\n      margin: 0;\r\n      padding: 0;\r\n      -webkit-text-size-adjust: 100%;\r\n      -ms-text-size-adjust: 100%;\r\n    }\r\n\r\n    table,\r\n    td {\r\n      border-collapse: collapse;\r\n      mso-table-lspace: 0pt;\r\n      mso-table-rspace: 0pt;\r\n    }\r\n\r\n    img {\r\n      border: 0;\r\n      height: auto;\r\n      line-height: 100%;\r\n      outline: none;\r\n      text-decoration: none;\r\n      -ms-interpolation-mode: bicubic;\r\n    }\r\n\r\n    p {\r\n      display: block;\r\n      margin: 13px 0;\r\n    }\r\n  </style>\r\n  <!--[if mso]>\r\n        <noscript>\r\n        <xml>\r\n        <o:OfficeDocumentSettings>\r\n          <o:AllowPNG/>\r\n          <o:PixelsPerInch>96</o:PixelsPerInch>\r\n        </o:OfficeDocumentSettings>\r\n        </xml>\r\n        </noscript>\r\n        <![endif]-->\r\n  <!--[if lte mso 11]>\r\n        <style type="text/css">\r\n          .mj-outlook-group-fix { width:100% !important; }\r\n        </style>\r\n        <![endif]-->\r\n  <!--[if !mso]><!-->\r\n  <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">\r\n  <style type="text/css">\r\n    @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);\r\n  </style>\r\n  <!--<![endif]-->\r\n  <style type="text/css">\r\n    @media only screen and (min-width:480px) {\r\n      .mj-column-per-100 {\r\n        width: 100% !important;\r\n        max-width: 100%;\r\n      }\r\n    }\r\n  </style>\r\n  <style media="screen and (min-width:480px)">\r\n    .moz-text-html .mj-column-per-100 {\r\n      width: 100% !important;\r\n      max-width: 100%;\r\n    }\r\n  </style>\r\n  <style type="text/css">\r\n    @media only screen and (max-width:480px) {\r\n      table.mj-full-width-mobile {\r\n        width: 100% !important;\r\n      }\r\n\r\n      td.mj-full-width-mobile {\r\n        width: auto !important;\r\n      }\r\n    }\r\n  </style>\r\n</head>\r\n\r\n<body style="word-spacing:normal;">\r\n  <div style="">\r\n    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->\r\n    <div style="margin:0px auto;max-width:600px;">\r\n      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">\r\n        <tbody>\r\n          <tr>\r\n            <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0;text-align:center;">\r\n              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->\r\n              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">\r\n                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">\r\n                  <tbody>\r\n                    <tr>\r\n                      <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">\r\n                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">\r\n                          <tbody>\r\n                            <tr>\r\n                              <td style="width:550px;">\r\n                                <img height="auto" src="https://res.cloudinary.com/de97aemr0/image/upload/v1672929483/logo/nzg8wx3j8wlrycwbnwec.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="550" />\r\n                              </td>\r\n                            </tr>\r\n                          </tbody>\r\n                        </table>\r\n                      </td>\r\n                    </tr>\r\n                  </tbody>\r\n                </table>\r\n              </div>\r\n              <!--[if mso | IE]></td></tr></table><![endif]-->\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n    <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->\r\n    <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;">\r\n      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;">\r\n        <tbody>\r\n          <tr>\r\n            <td style="direction:ltr;font-size:0px;padding:20px 0;padding-top:10;text-align:center;">\r\n              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->\r\n              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">\r\n                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">\r\n                  <tbody>\r\n                    <tr>\r\n                      <td align="justify" style="font-size:0px;padding:10px 25px;word-break:break-word;">\r\n                        <div style="font-family:helvetica;font-size:18px;line-height:1;text-align:justify;color:#000000;">Good Day {{user.firstName}} {{user.lastName}}, <br /><br /> We have successfully received your order on {{createdAt}}. We\u2019re getting your order ready for shipping. We hope to see you shopping with us again soon!</div>\r\n                      </td>\r\n                    </tr>\r\n                  </tbody>\r\n                </table>\r\n              </div>\r\n              <!--[if mso | IE]></td></tr></table><![endif]-->\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n    <!--[if mso | IE]></td></tr></table><![endif]-->\r\n    <p style="border-top:solid 4px #E8E8E8;font-size:1px;margin:0px auto;width:100%;">\r\n    </p>\r\n    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 4px #E8E8E8;font-size:1px;margin:0px auto;width:550px;" role="presentation" width="550px" ><tr><td style="height:0;line-height:0;"> &nbsp;\r\n</td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->\r\n    <div style="margin:0px auto;max-width:600px;">\r\n      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">\r\n        <tbody>\r\n          <tr>\r\n            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">\r\n              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->\r\n              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">\r\n                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">\r\n                  <tbody>\r\n                    <tr>\r\n                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">\r\n                        <div style="font-family:helvetica;font-size:23px;line-height:1;text-align:left;color:#000000;">Details:</div>\r\n                      </td>\r\n                    </tr>\r\n                    <tr>\r\n                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">\r\n                        <div style="font-family:helvetica;font-size:18px;line-height:1;text-align:left;color:#000000;">Order ID: {{orderId}} <br /><br /> Name: {{user.firstName}} {{user.lastName}} <br /><br /> Address: {{address}}, {{city}} <br /><br /> Phone: {{user.phoneNumber}} <br /><br /> Email: {{user.email}} <br /></div>\r\n                      </td>\r\n                    </tr>\r\n                  </tbody>\r\n                </table>\r\n              </div>\r\n              <!--[if mso | IE]></td></tr></table><![endif]-->\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n    <!--[if mso | IE]></td></tr></table><![endif]-->\r\n    <p style="border-top:solid 4px #E8E8E8;font-size:1px;margin:0px auto;width:100%;">\r\n    </p>\r\n    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 4px #E8E8E8;font-size:1px;margin:0px auto;width:550px;" role="presentation" width="550px" ><tr><td style="height:0;line-height:0;"> &nbsp;\r\n</td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->\r\n    <div style="margin:0px auto;max-width:600px;">\r\n      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">\r\n        <tbody>\r\n          <tr>\r\n            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">\r\n              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->\r\n              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">\r\n                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">\r\n                  <tbody>\r\n                    <tr>\r\n                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">\r\n                        <div style="font-family:helvetica;font-size:23px;line-height:1;text-align:left;color:#000000;">Items:</div>\r\n                      </td>\r\n                    </tr>\r\n                    <tr>\r\n                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">\r\n                        <table cellpadding="0" cellspacing="0" width="100%" border="0" style="color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;table-layout:auto;width:100%;border:none;">\r\n                          <tr style="\r\n              border-bottom: 1px solid #ecedee;\r\n              text-align: left;\r\n              padding: 15px 10px;\r\n              font-size: 20px;\r\n              font-family: helvetica\r\n            ">\r\n                            <th></th>\r\n                          </tr>\r\n                          {{#each items}}\r\n                            <tr style="\r\n              border-bottom: 1px solid #ecedee;\r\n              text-align: left;\r\n              padding: 15px 0;\r\n              font-family: helvetica\r\n            ">\r\n                              <td style="font-size: 17px; padding: 10px 15px 10px 0">\r\n                                {{name}} (x{{quantity}}) <br /> P{{totalPrice}}\r\n                              </td>\r\n                            </tr>\r\n                          {{/each}}\r\n                        </table>\r\n                      </td>\r\n                    </tr>\r\n                  </tbody>\r\n                </table>\r\n              </div>\r\n              <!--[if mso | IE]></td></tr></table><![endif]-->\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n    <!--[if mso | IE]></td></tr></table><![endif]-->\r\n    <p style="border-top:solid 4px #E8E8E8;font-size:1px;margin:0px auto;width:100%;">\r\n    </p>\r\n    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 4px #E8E8E8;font-size:1px;margin:0px auto;width:550px;" role="presentation" width="550px" ><tr><td style="height:0;line-height:0;"> &nbsp;\r\n</td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->\r\n    <div style="margin:0px auto;max-width:600px;">\r\n      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">\r\n        <tbody>\r\n          <tr>\r\n            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">\r\n              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->\r\n              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">\r\n                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">\r\n                  <tbody>\r\n                    <tr>\r\n                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">\r\n                        <div style="font-family:helvetica;font-size:23px;line-height:1;text-align:left;color:#000000;">Summary:</div>\r\n                      </td>\r\n                    </tr>\r\n                    <tr>\r\n                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">\r\n                        <div style="font-family:helvetica;font-size:18px;line-height:1;text-align:left;color:#000000;">Subtotal: P{{payment.amountDue}} <br /><br /> Shipping Fee: P{{payment.shippingFee}} <br /><br /> Total: P{{payment.total}} <br /></div>\r\n                      </td>\r\n                    </tr>\r\n                  </tbody>\r\n                </table>\r\n              </div>\r\n              <!--[if mso | IE]></td></tr></table><![endif]-->\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n    <!--[if mso | IE]></td></tr></table><![endif]-->\r\n    <p style="border-top:solid 4px #E8E8E8;font-size:1px;margin:0px auto;width:100%;">\r\n    </p>\r\n    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 4px #E8E8E8;font-size:1px;margin:0px auto;width:550px;" role="presentation" width="550px" ><tr><td style="height:0;line-height:0;"> &nbsp;\r\n</td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->\r\n    <div style="margin:0px auto;max-width:600px;">\r\n      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">\r\n        <tbody>\r\n          <tr>\r\n            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">\r\n              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->\r\n              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">\r\n                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">\r\n                  <tbody>\r\n                    <tr>\r\n                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">\r\n                        <div style="font-family:helvetica;font-size:18px;font-weight:bold;line-height:1;text-align:left;color:#000000;">Have any questions?</div>\r\n                      </td>\r\n                    </tr>\r\n                    <tr>\r\n                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">\r\n                        <div style="font-family:helvetica;font-size:18px;line-height:1;text-align:left;color:#000000;">You may contact us at *COMPANY EMAIL & PHONE*</div>\r\n                      </td>\r\n                    </tr>\r\n                  </tbody>\r\n                </table>\r\n              </div>\r\n              <!--[if mso | IE]></td></tr></table><![endif]-->\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n    <!--[if mso | IE]></td></tr></table><![endif]-->\r\n  </div>\r\n</body>\r\n\r\n</html>'
}
