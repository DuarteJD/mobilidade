import { getCustomRepository } from "typeorm";
import { Viajem } from '../entity/Viajem'

import ViajemRepository from '../repositories/ViajemRepository';
import TratamentoDeErros  from "../errors/TratamentoDeErros";

interface Request {
  id: string;
  situacao?: number;
  status_atual?: number;
  distancia_percorrida?: string;
  tempo_percorrido?: string;
  nota_motorista?: number;
  nota_cliente?: number;
  motorista?: string;
  veiculo?: string;
  motivo_cancelamento?: string;
}

class ViajemServiceAtualizar {
  public async execute({
    id,
    situacao,
    status_atual,
    distancia_percorrida,
    tempo_percorrido,
    nota_motorista,
    nota_cliente,
    motorista,
    veiculo,
    motivo_cancelamento,
  }: Request): Promise<Viajem> {

    const repository = getCustomRepository(ViajemRepository)

    const encontrarID = await repository.findOne(id)

    if(!encontrarID) {
      throw new TratamentoDeErros('Viajem não encontrada!', 404)
    }

    const linha = await repository.update(id, {
      situacao,
      status_atual,
      distancia_percorrida,
      tempo_percorrido,
      nota_motorista,
      nota_cliente,
      motorista,
      veiculo,
      motivo_cancelamento,
    })

    if(!linha.affected) {
      throw new TratamentoDeErros('Nenhum registro foi alterado!', 400)
    }

    const registro = await repository.findOne(id)

    return registro

  }
}
export default ViajemServiceAtualizar;
