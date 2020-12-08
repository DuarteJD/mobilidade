import { getCustomRepository } from "typeorm";
import { Veiculos } from '../entity/Veiculos'

import VeiculosRepository from '../repositories/VeiculosRepository';
import TratamentoDeErros  from "../errors/TratamentoDeErros";

interface Request {
  id: string;
  nome?: string;
  placa?: string;
  ano?: string;
  marca?: string;
  cor?: string;
  motorista?: string;
  is_aprovado?: boolean;
}

class VeiculosServiceAtualizar {
  public async execute({
    id,
    nome,
    placa,
    ano,
    marca,
    cor,
    motorista,
    is_aprovado
  }: Request): Promise<Veiculos> {

    const repository = getCustomRepository(VeiculosRepository)

    const encontrarID = await repository.buscarPorId({id, usuario: motorista })

    if(!encontrarID) {
      throw new TratamentoDeErros('Veículo não encontrado!', 404)
    }

    if(placa){
      const encontrarPlaca = await repository.buscarPorPlaca( placa )
      if(encontrarPlaca) {
        if(encontrarPlaca.id !== id){
          throw new TratamentoDeErros('Este veículo já encontra-se cadastrado!', 422)
        }
      }
    }

    const linha = await repository.update(id, {
      nome,
      placa,
      ano,
      marca,
      cor,
      motorista,
      is_aprovado
    })

    if(!linha.affected) {
      throw new TratamentoDeErros('Nenhum registro foi alterado!', 400)
    }

    const registro = await repository.buscarPorId({id, usuario: motorista})

    return registro

  }
}
export default VeiculosServiceAtualizar;
