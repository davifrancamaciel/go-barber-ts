import { injectable, inject } from 'tsyringe'
import nodemailer, { Transporter } from 'nodemailer'
import aws from 'aws-sdk'

import mailConfig from '@config/mail'
import IMailProvider from '../models/IMailProvider'
import ISendMailDTO from '../dtos/ISendMailDTO'

import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider'

interface IMessage {
  to: string
  body: string
}

@injectable()
export default class SESMailProvider implements IMailProvider {
  private client: Transporter
  constructor (
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider
  ) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_DEFAULT_REGION
        //region: 'us-west-2'
      })
    })
  }

  public async senMail ({
    to,
    subject,
    from,
    template
  }: ISendMailDTO): Promise<void> {
    await this.client.sendMail({
      from: {
        name: from?.name || mailConfig.defaults.from.name,
        address: from?.email || mailConfig.defaults.from.email
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      html: await this.mailTemplateProvider.parse(template)
    })
  }
}
