
import { getCustomRepository } from "typeorm";
import { EnderecoFavorito } from "../entity/EnderecoFavorito";

import EnderecoFavoritoRepository from "../repositories/EnderecoFavoritoRepository";
import TratamentoDeErros  from "../errors/TratamentoDeErros";

interface Request {
  id: string;
  nome?: string;
  latitude: string;
  longitude: string;
  usuario: string
}

class EnderecoFavoritoServiceAtualizar {
  public async execute({
    id,
    nome,
    latitude,
    longitude,
    usuario,
  }: Request): Promise<EnderecoFavorito> {

    const repository = getCustomRepository(EnderecoFavoritoRepository)

    const encontrarID = await repository.findOne( id )

    if(!encontrarID) {
      throw new TratamentoDeErros('Endereço não encontrado!', 404)
    }

    const encontrarNome = await repository.buscarPorNome({ nome, usuario})

    if(encontrarNome && encontrarNome.id !== id) {
      throw new TratamentoDeErros('Você já cadstrou um endereço para este nome!', 422)
    }

    const linha = await repository.update(id, {
      nome,
      latitude,
      longitude,
      usuario
    })

    if(!linha.affected) {
      throw new TratamentoDeErros('Nenhum registro foi alterado!', 400)
    }

    const registro = await repository.buscarPorId({ id, usuario})

    return registro

  }
}
export default EnderecoFavoritoServiceAtualizar;
