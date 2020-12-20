
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';

interface IMailContact {
  name: string;
  email: string;
}

interface IMailSendDTO {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  body: string;
}

export default class EtherealMailProvider {
  private client: Transporter;

  constructor() {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'teresa53@ethereal.email',
        pass: 'ssrPKchswMfpvqqGbU',
      },
    });

    this.client = transporter;

  }

  public async sendMail({
    from,
    to,
    subject,
    body
  }: IMailSendDTO): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: 'Equipe NossoCarro',
        address: 'contato@nossocarro.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: body,
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
