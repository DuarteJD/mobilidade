
import { getCustomRepository } from "typeorm";
import { EnderecoFavorito } from "../entity/EnderecoFavorito";

import EnderecoFavoritoRepository from "../repositories/EnderecoFavoritoRepository";
import TratamentoDeErros  from "../errors/TratamentoDeErros";

interface Request {
  nome: string;
  latitude: string;
  longitude: string;
  usuario: string
}

class EnderecoFavoritoServiceCriar {
  public async execute({
    nome,
    latitude,
    longitude,
    usuario,
  }: Request): Promise<EnderecoFavorito> {

    const repository = getCustomRepository(EnderecoFavoritoRepository)

    const encontrarNome = await repository.buscarPorNome({ nome, usuario})

    if(encontrarNome) {
      throw new TratamentoDeErros('Você já cadstrou um endereço para este nome!', 422)
    }

    const registro = repository.create({
      nome,
      latitude,
      longitude,
      usuario
    })

    await repository.save(registro)

    return registro

  }
}
export default EnderecoFavoritoServiceCriar;
