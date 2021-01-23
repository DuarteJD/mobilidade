import { getCustomRepository } from "typeorm";
import { Viajem } from '../entity/Viajem'

import ViajemRepository from '../repositories/ViajemRepository';
import { formatISO } from 'date-fns';

interface Request {
  is_agendamento: boolean;
  data: Date;
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
  quantidade_passageiro: number;
}

class ViajemServiceCriar {
  public async execute({
    data,
    is_agendamento,
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
    quantidade_passageiro,
  }: Request): Promise<Viajem> {

    const repository = getCustomRepository(ViajemRepository)

    let dataViagem = formatISO(new Date());
    if(is_agendamento && is_agendamento == true && data) {
      dataViagem = formatISO(data);
    }

    const dataCadastro = formatISO(new Date());

    const registro = repository.create({
      data: dataViagem,
      situacao: 0,
      status_atual: 1,
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
      quantidade_passageiro,
      status: [{
        data: dataCadastro,
        status: 1
      }]
    })

    await repository.save(registro)

    return registro

  }
}
export default ViajemServiceCriar;
