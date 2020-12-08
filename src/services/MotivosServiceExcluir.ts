import { getCustomRepository } from "typeorm";
import MotivosRepository from "../repositories/MotivosRepository";

import TratamentoDeErros  from "../errors/TratamentoDeErros";

interface Response {
  id: string;
}

class MotivosServiceExcluir {
  public async execute({ id }: Response) : Promise<void> {

    const repository = getCustomRepository(MotivosRepository)

    const registro = await repository.buscarPorId(id)

    if(!registro) {
      throw new TratamentoDeErros('Motivo não encontrado!', 404)
    }

    const linha = await repository.update(id, {
      is_ativo:false
    })

    if(!linha.affected) {
      throw new TratamentoDeErros('Nenhum registro foi alterado!', 400)
    }
  }
}

export default MotivosServiceExcluir;
