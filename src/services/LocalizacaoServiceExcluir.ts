import { getCustomRepository } from "typeorm";

import LocalizacaoRepository from '../repositories/LocalizacaoRepository';
import TratamentoDeErros  from "../errors/TratamentoDeErros";

interface Response {
  id: string;
  usuario: string;
}

class LocalizacaoServiceExcluir {
  public async execute({ id, usuario }: Response) : Promise<void> {

    const repository = getCustomRepository(LocalizacaoRepository)

    const registro = await repository.buscarPorId({id,usuario})

    if(!registro) {
      throw new TratamentoDeErros('Localização não encontrada!', 404)
    }

    await repository.remove(registro);

  }
}

export default LocalizacaoServiceExcluir;
