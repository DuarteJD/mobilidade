import { getCustomRepository } from "typeorm";
import { Jornada } from '../entity/Jornada'

import JornadaRepository from '../repositories/JornadaRepository';
import TratamentoDeErros  from "../errors/TratamentoDeErros";

interface Request {
  id: string;
  data_final: Date;
  motorista: string;
  quantidade_total_viajens: number;
  quantidade_total_vidas: number;
  valor_total_viajens: number;
  latitude_final: string;
  longitude_final: string;
}

class JornadaServiceFinalizar {
  public async execute({
    id,
    data_final,
    motorista,
    quantidade_total_viajens,
    quantidade_total_vidas,
    valor_total_viajens,
    latitude_final,
    longitude_final
  }: Request): Promise<Jornada> {

    const repository = getCustomRepository(JornadaRepository)

    const encontrarAberta = await repository.buscarJornadaEmAberto(motorista)

    if(!encontrarAberta) {
      throw new TratamentoDeErros('Você não possui uma jornada em aberto!', 422)
    }

    if(encontrarAberta.id !== id) {
      throw new TratamentoDeErros('O ID da sua jornada em aberto não confere com este ID de fechamento!', 422)
    }

    const linha = await repository.update(id, {
      data_final,
      quantidade_total_viajens,
      quantidade_total_vidas,
      valor_total_viajens,
      latitude_final,
      longitude_final,
      is_trabalhando: false,
      is_integrado: false
    })

    if(!linha.affected) {
      throw new TratamentoDeErros('Nenhum registro foi alterado!', 400)
    }

    const registro = await repository.buscarPorId({id,motorista})

    return registro

  }
}
export default JornadaServiceFinalizar;
