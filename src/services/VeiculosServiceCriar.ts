import { getCustomRepository } from "typeorm";
import { Veiculos } from '../entity/Veiculos'

import VeiculosRepository from '../repositories/VeiculosRepository';
import TratamentoDeErros  from "../errors/TratamentoDeErros";

interface Request {
  nome: string;
  placa: string;
  ano: string;
  marca: string;
  cor: string;
  motorista: string;
}

class VeiculosServiceCriar {
  public async execute({
    nome,
    placa,
    ano,
    marca,
    cor,
    motorista
  }: Request): Promise<Veiculos> {

    const repository = getCustomRepository(VeiculosRepository)

    const encontrarPlaca = await repository.buscarPorPlaca(placa)

    if(encontrarPlaca) {
      throw new TratamentoDeErros('Esta placa já encontra-se cadastrada!', 422)
    }

    const registro = repository.create({
      nome,
      placa,
      ano,
      marca,
      cor,
      motorista
    })

    await repository.save(registro)

    return registro

  }
}
export default VeiculosServiceCriar;
