import { getCustomRepository } from "typeorm";
import UsuariosRepository from "../repositories/UsuariosRepository";
import { Usuarios } from "../entity/Usuarios";

import TratamentoDeErros  from "../errors/TratamentoDeErros";

interface Localizacao {
  id: string;
}

interface Request {
  id: string;
  ultima_localizacao: Localizacao;
}

class UsuarioServiceAtualizarLocalizacao {
  public async execute({
    id,
    ultima_localizacao,
    }: Request): Promise<Usuarios> {

    const repository = getCustomRepository(UsuariosRepository)

    const encontrarID = await repository.findOne(id)

    if(!encontrarID) {
      throw new TratamentoDeErros('Usuário não encontrado!', 404)
    }

    const linha = await repository.update(id, {
      ultima_localizacao
    })

    if(!linha.affected) {
      throw new TratamentoDeErros('Nenhum registro foi alterado!', 400)
    }

    const registro = await repository.findOne(id)

    return registro

  }
}
export default UsuarioServiceAtualizarLocalizacao;
