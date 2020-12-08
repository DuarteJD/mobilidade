import { getCustomRepository } from "typeorm";
import { Viajem } from '../entity/Viajem'

import ViajemRepository from '../repositories/ViajemRepository';
import TratamentoDeErros  from "../errors/TratamentoDeErros";

interface Request {
  id: string;
  motivo_cancelamento: string;
  situacao: 1 | 2;
}

class ViajemServiceCancelar {
  public async execute({
    id,
    motivo_cancelamento,
    situacao

  }: Request): Promise<Viajem> {

    const repository = getCustomRepository(ViajemRepository)

    const encontrarID = await repository.findOne(id)

    if(!encontrarID) {
      throw new TratamentoDeErros('Viajem não encontrada!', 404)
    }

    if(encontrarID.status_atual !== 1) {
      throw new TratamentoDeErros('O Status dessa viajem não permite mais cancelamento!', 404)
    }

    if(encontrarID.situacao === 0) {
      throw new TratamentoDeErros('Viajem já cancelada!', 404)
    }

    const linha = await repository.update(id, {
      situacao,
      motivo_cancelamento,
    })

    if(!linha.affected) {
      throw new TratamentoDeErros('Nenhum registro foi alterado!', 400)
    }

    const registro = await repository.findOne(id)

    return registro

  }
}
export default ViajemServiceCancelar;
