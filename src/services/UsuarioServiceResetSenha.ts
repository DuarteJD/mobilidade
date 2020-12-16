import { getCustomRepository } from "typeorm";
import UsuariosRepository from "../repositories/UsuariosRepository";
import { hash } from 'bcryptjs';

import TratamentoDeErros  from "../errors/TratamentoDeErros";

interface Request {
  email: string;
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
    console.log(senha_temporaria);
    const senhaCriptografada = await hash(senha_temporaria, 8);

    const linha = await repository.update(encontrarID.id, {
      senha_temporaria: senhaCriptografada,
    })

    if(!linha.affected) {
      throw new TratamentoDeErros('Nenhum registro foi alterado!', 400)
    }
  }
}
export default UsuarioServiceResetSenha;
