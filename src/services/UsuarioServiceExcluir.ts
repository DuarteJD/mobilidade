import { getCustomRepository } from "typeorm";
import UsuariosRepository from "../repositories/UsuariosRepository";

import TratamentoDeErros  from "../errors/TratamentoDeErros";

interface Response {
  id: string;
}

class UsuarioServiceExcluir {
  public async execute({ id }: Response) : Promise<void> {

    const repository = getCustomRepository(UsuariosRepository)

    const registro = await repository.findOne(id)

    if(!registro) {
      throw new TratamentoDeErros('Usuário não encontrado!', 404)
    }

    await repository.remove(registro);

  }
}

export default UsuarioServiceExcluir;
