import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as SendGrid from '@sendgrid/mail'

@Injectable()
export class MailService {
  constructor(private configService: ConfigService) {
    SendGrid.setApiKey(this.configService.get('SENDGRID_API_KEY'))
  }

  async send(mail: SendGrid.MailDataRequired) {
    const transport = await SendGrid.send(mail)

    return transport
  }
}
