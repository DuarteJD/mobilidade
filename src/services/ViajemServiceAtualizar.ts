import { getCustomRepository, getRepository } from "typeorm";
import { Viajem } from '../entity/Viajem'
import { formatISO } from 'date-fns';

import { ViajemStatus } from '../entity/ViajemStatus';
import ViajemRepository from '../repositories/ViajemRepository';
import TratamentoDeErros  from "../errors/TratamentoDeErros";

interface Request {
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
  public async execute(id: string, data: Request): Promise<Viajem> {

    const repository = getCustomRepository(ViajemRepository)

    const encontrarID = await repository.findOne(id)

    if(!encontrarID) {
      throw new TratamentoDeErros('Viajem não encontrada!', 404)
    }

    let isMudouStatusAtual = false;
    if(data.status_atual && data.status_atual !== encontrarID.status_atual)  {
      isMudouStatusAtual = true
    }

    const linha = await repository.update(id, data);

    if(!linha.affected) {
      throw new TratamentoDeErros('Nenhum registro foi alterado!', 400)
    }

    if(isMudouStatusAtual) {
      const dataCadastro = formatISO(new Date());

      const statusViajemRepository = getRepository(ViajemStatus);

      const registroStatus = statusViajemRepository.create({
        viajem: encontrarID.id,
        data: dataCadastro,
        status: 1
      })

      await statusViajemRepository.save(registroStatus)
    }

    const registro = await repository.findOne(id)

    return registro

  }
}
export default ViajemServiceAtualizar;
