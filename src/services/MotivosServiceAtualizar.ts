import { getCustomRepository } from "typeorm";
import { Motivos } from "../entity/Motivos";

import MotivosRepository from "../repositories/MotivosRepository";
import TratamentoDeErros  from "../errors/TratamentoDeErros";

interface Request {
  id: string;
  nome?: string;
  is_mostrar_cliente?: boolean;
  is_mostrar_motorista?: boolean;
}

class MotivosServiceAtualizar {
  public async execute({
    id,
    nome,
    is_mostrar_cliente,
    is_mostrar_motorista
  }: Request): Promise<Motivos> {

    const repository = getCustomRepository(MotivosRepository)

    const encontrarID = await repository.buscarPorId( id )

    if(!encontrarID) {
      throw new TratamentoDeErros('Motivo não encontrado!', 404)
    }

    if(nome){
      const encontrarNome = await repository.buscarPorNome( nome )
      if(encontrarNome) {
        if(encontrarNome.id !== id){
          throw new TratamentoDeErros('Este motivo já encontra-se cadastrado!', 422)
        }
      }
    }

    const linha = await repository.update(id, {
      nome,
      is_mostrar_cliente,
      is_mostrar_motorista
    })

    if(!linha.affected) {
      throw new TratamentoDeErros('Nenhum registro foi alterado!', 400)
    }

    const registro = await repository.buscarPorId(id)

    return registro

  }
}
export default MotivosServiceAtualizar;
