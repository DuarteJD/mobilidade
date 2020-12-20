import { getCustomRepository } from "typeorm";
import UsuariosRepository from "../repositories/UsuariosRepository";
import { hash } from 'bcryptjs';
import * as Handlebars  from "handlebars";
import * as fs from 'fs';
import * as path from 'path';

import TratamentoDeErros  from "../errors/TratamentoDeErros";
import EthrealMailProvider from '../providers/EthrealMailProvider';

interface Request {
  email: string;
}

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

class UsuarioServiceResetSenha {
  public async execute({
    email
    }: Request): Promise<void> {

    const repository = getCustomRepository(UsuariosRepository)

    const encontrarID = await repository.buscarPorEmail(email)

    if(!encontrarID) {
      throw new TratamentoDeErros('Usuário não encontrado!', 404)
    }

    const senha_temporaria = Math.random().toString(36).substring(7);
    const senhaCriptografada = await hash(senha_temporaria, 8);

    const linha = await repository.update(encontrarID.id, {
      senha_temporaria: senhaCriptografada,
    })

    if(!linha.affected) {
      throw new TratamentoDeErros('Nenhum registro foi alterado!', 400)
    }

    const templateFile = fs.readFileSync(path.resolve(__dirname, '..', 'view','RecuperarSenha.hbs')).toString('utf8');

    const templateString = Handlebars.compile(templateFile);

    const variaveis = { "apelido" : encontrarID.apelido, "senha-temporaria": senha_temporaria}

    const htmlBody = templateString(variaveis);

    const emailTo : IMailSendDTO =
    {
      to:
      {
        name: encontrarID.apelido,
        email: encontrarID.email
      },
      subject: `Recuperação de senha ${senha_temporaria}`,
      body: htmlBody
    }

    const mailProvider = new EthrealMailProvider();
    await mailProvider.sendMail(emailTo);

  }
}
export default UsuarioServiceResetSenha;
