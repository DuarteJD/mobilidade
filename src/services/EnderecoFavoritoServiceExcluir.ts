import { getCustomRepository } from "typeorm";
import EnderecoFavoritoRepository from "../repositories/EnderecoFavoritoRepository";

import TratamentoDeErros  from "../errors/TratamentoDeErros";

interface Response {
  id: string;
  usuario: string;
}

class EnderecoFavoritoServiceExcluir {
  public async execute({ id, usuario }: Response) : Promise<void> {

    const repository = getCustomRepository(EnderecoFavoritoRepository)

    const registro = await repository.findOne(id)

    if(!registro) {
      throw new TratamentoDeErros('Endereço não encontrado!', 404)
    }

    if(registro.usuario !== usuario) {
      throw new TratamentoDeErros('Este endereço não pertence ao seu usuário!', 404)
    }

    await repository.remove(registro);

  }
}

export default EnderecoFavoritoServiceExcluir;
