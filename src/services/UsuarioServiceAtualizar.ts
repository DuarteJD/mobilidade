import { getCustomRepository } from "typeorm";
import UsuariosRepository from "../repositories/UsuariosRepository";
import { Usuarios } from "../entity/Usuarios";

import TratamentoDeErros  from "../errors/TratamentoDeErros";

interface Request {
  id?: string;
  nome?: string;
  apelido?: string;
  email?: string;
  tipo?: 1 | 2;
  celular?: string;
  senha?: string;
  cpf?: string;
  rg?: string;
  avatar_url?: string;
}

class UsuarioServiceAtualizar {
  public async execute({
    id,
    nome,
    apelido,
    email,
    tipo,
    celular,
    cpf,
    rg,
    avatar_url }: Request): Promise<Usuarios> {

    const repository = getCustomRepository(UsuariosRepository)

    const encontrarID = await repository.findOne( id )

    if(!encontrarID) {
      throw new TratamentoDeErros('Usuário não encontrado!', 404)
    }

    const encontrarCelular = await repository.buscarPorCelular( celular )
    if(encontrarCelular) {
      if(encontrarCelular.id !== id){
        throw new TratamentoDeErros('Este celular já encontra-se cadastrado para outro usuário!', 422)
      }
    }

    const linha = await repository.update(id, {
      nome,
      apelido,
      email,
      tipo,
      celular,
      senha_temporaria:null,
      cpf,
      rg,
      avatar_url
    })

    if(!linha.affected) {
      throw new TratamentoDeErros('Nenhum registro foi alterado!', 400)
    }

    const registro = await repository.findOne(id)

    return registro

  }
}
export default UsuarioServiceAtualizar;
