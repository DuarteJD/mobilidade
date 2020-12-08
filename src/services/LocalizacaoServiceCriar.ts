import { getCustomRepository } from "typeorm";
import { Localizacao } from '../entity/Localizacao'

import LocalizacaoRepository from '../repositories/LocalizacaoRepository';

interface Request {
  data: Date;
  usuario: string;
  latitude: string;
  longitude: string;
  precisao: string;
  velocidade: string;
  direcao: string;
}

class LocalizacaoServiceCriar {
  public async execute({
    data,
    latitude,
    longitude,
    precisao,
    velocidade,
    direcao,
    usuario
  }: Request): Promise<Localizacao> {

    const repository = getCustomRepository(LocalizacaoRepository)

    const registro = repository.create({
      data,
      usuario,
      latitude,
      longitude,
      precisao,
      velocidade,
      direcao
    })

    await repository.save(registro)

    return registro

  }
}
export default LocalizacaoServiceCriar;
