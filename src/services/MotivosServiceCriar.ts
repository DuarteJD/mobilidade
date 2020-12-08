import { getCustomRepository } from "typeorm";
import { Motivos } from '../entity/Motivos'

import MotivosRepository from '../repositories/MotivosRepository';
import TratamentoDeErros  from "../errors/TratamentoDeErros";

interface Request {
  nome: string;
  is_mostrar_cliente: boolean;
  is_mostrar_motorista: boolean;
}

class MotivoServiceCriar {
  public async execute({
    nome,
    is_mostrar_cliente,
    is_mostrar_motorista,
  }: Request): Promise<Motivos> {

    const repository = getCustomRepository(MotivosRepository)

    const encontrarNome = await repository.buscarPorNome(nome)

    if(encontrarNome) {
      throw new TratamentoDeErros('Este motivo já encontra-se cadastrado!', 422)
    }

    const registro = repository.create({
      nome,
      is_mostrar_cliente,
      is_mostrar_motorista
    })

    await repository.save(registro)

    return registro

  }
}
export default MotivoServiceCriar;
