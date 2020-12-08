import { hash } from 'bcryptjs';
import { getCustomRepository } from "typeorm";
import { Usuarios } from "../entity/Usuarios";

import UsuariosRepository from "../repositories/UsuariosRepository";
import TratamentoDeErros  from "../errors/TratamentoDeErros";

interface Request {
  nome: string;
  apelido: string;
  email: string;
  tipo: 1 | 2;
  celular: string;
  senha: string;
  cpf: string;
  rg: string;
  avatar_url: string;
}

class UsuarioServiceCriar {
  public async execute({
    nome,
    apelido,
    email,
    tipo,
    celular,
    senha,
    cpf,
    rg,
    avatar_url }: Request): Promise<Usuarios> {

    const repository = getCustomRepository(UsuariosRepository)

    const encontrarEmail = await repository.buscarPorEmail( email )

    if(encontrarEmail) {
      throw new TratamentoDeErros('Este e-mail já encontra-se cadastrado para outro usuário!', 422)
    }

    const encontrarCelular = await repository.buscarPorCelular( celular )
    if(encontrarCelular) {
      throw new TratamentoDeErros('Este celular já encontra-se cadastrado para outro usuário!', 422)
    }

    const senhaCriptografada = await hash(senha, 8);

    const registro = repository.create({
      nome,
      apelido,
      email,
      tipo,
      celular,
      senha: senhaCriptografada,
      cpf,
      rg,
      avatar_url
    })

    await repository.save(registro)

    return registro

  }
}
export default UsuarioServiceCriar;
