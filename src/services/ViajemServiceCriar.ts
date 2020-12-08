import { getCustomRepository } from "typeorm";
import { Viajem } from '../entity/Viajem'

import ViajemRepository from '../repositories/ViajemRepository';
import TratamentoDeErros  from "../errors/TratamentoDeErros";


interface Request {
  data: Date;
  situacao: number;
  status_atual: number;
  latitude_de: string;
  longitude_de: string;
  endereco_de: string;
  latitude_para: string;
  longitude_para: string;
  endereco_destino: string;
  distancia_calculada: string;
  tempo_estimado: string;
  valor: number;
  cliente: string;
  status: {
    data: Date;
    status: number;
  }
}

class ViajemServiceCriar {
  public async execute({
    data,
    situacao,
    status_atual,
    latitude_de,
    longitude_de,
    endereco_de,
    latitude_para,
    longitude_para,
    endereco_destino,
    distancia_calculada,
    tempo_estimado,
    valor,
    cliente,
  }: Request): Promise<Viajem> {

    const repository = getCustomRepository(ViajemRepository)

    const registro = repository.create({
      data,
      situacao,
      status_atual,
      latitude_de,
      longitude_de,
      endereco_de,
      latitude_para,
      longitude_para,
      endereco_destino,
      distancia_calculada,
      tempo_estimado,
      valor,
      cliente,
      status: [{
        data,
        status: status_atual
      }]
    })

    await repository.save(registro)

    return registro

  }
}
export default ViajemServiceCriar;
