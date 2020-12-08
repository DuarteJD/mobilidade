import { getCustomRepository } from "typeorm";
import { Jornada } from '../entity/Jornada'

import JornadaRepository from '../repositories/JornadaRepository';
import TratamentoDeErros  from "../errors/TratamentoDeErros";

interface Request {
  data_inicial: Date;
  motorista: string;
  veiculo: string;
  latitude_inicial: string;
  longitude_inicial: string;
}

class JornadaServiceCriar {
  public async execute({
    data_inicial,
    motorista,
    veiculo,
    latitude_inicial,
    longitude_inicial
  }: Request): Promise<Jornada> {

    const repository = getCustomRepository(JornadaRepository)

    const encontrarAberta = await repository.buscarJornadaEmAberto(motorista)

    if(encontrarAberta) {
      throw new TratamentoDeErros('Você já possui uma jornada em aberto!', 422)
    }

    const registro = repository.create({
      data_inicial,
      motorista,
      veiculo,
      latitude_inicial,
      longitude_inicial
    })

    await repository.save(registro)

    return registro

  }
}
export default JornadaServiceCriar;
