import { getCustomRepository } from "typeorm";

import VeiculosRepository from '../repositories/VeiculosRepository';
import TratamentoDeErros  from "../errors/TratamentoDeErros";

interface Response {
  id: string;
  motorista: string;
}

class VeiculosServiceExcluir {
  public async execute({ id, motorista }: Response) : Promise<void> {

    const repository = getCustomRepository(VeiculosRepository)

    const registro = await repository.buscarPorId({id, usuario: motorista})

    if(!registro) {
      throw new TratamentoDeErros('Veículo não encontrado!', 404)
    }

    const linha = await repository.update(id, {
      is_ativo:false
    })

    if(!linha.affected) {
      throw new TratamentoDeErros('Nenhum registro foi alterado!', 400)
    }
  }
}

export default VeiculosServiceExcluir;
