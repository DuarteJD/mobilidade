import { getCustomRepository } from "typeorm";
import { Request, Response } from "express";

import ViajemRepository from '../repositories/ViajemRepository';
import ViajemServiceCriar from "../services/ViajemServiceCriar";
import ViajemServiceCancelar from "../services/ViajemServiceCancelar";
import ViajemServiceAtualizar from "../services/ViajemServiceAtualizar";

export default class ViajemController {

  public async all(request: Request, response: Response): Promise<Response> {
    const { id, tipo } = request.usuario
    const pagina = !request.query.pagina ? 1 : Number(request.query.pagina)
    const numero_registros = !request.query.registros ? 20 : Number(request.query.registros)
    const repo = getCustomRepository(ViajemRepository)

    const todos = tipo === 1 ? repo.buscarTodosDoCliente({id, pagina, numero_registros }) : repo.buscarTodosDoMotorista({id, pagina, numero_registros })
    return response.json(todos)
  }

  public async one(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const usuario = request.usuario
    const umRegistro = await getCustomRepository(ViajemRepository).buscarPorId({ id, usuario})
    return response.json(umRegistro)
  }

  async save(request: Request, response: Response): Promise<Response> {
    const corpo = request.body
    const service = new ViajemServiceCriar()
    const registro = await service.execute(corpo)
    return response.json(registro)
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const {
      situacao,
      status_atual,
      distancia_percorrida,
      tempo_percorrido,
      nota_motorista,
      nota_cliente,
      motorista,
      veiculo,
      motivo_cancelamento,
    } = request.body
    const usuario = request.usuario.id

    const service = new ViajemServiceAtualizar()
    const registro = await service.execute({
      id,
      situacao,
      status_atual,
      distancia_percorrida,
      tempo_percorrido,
      nota_motorista,
      nota_cliente,
      motorista,
      veiculo,
      motivo_cancelamento
    })
    return response.json(registro)
  }

  async cancelar(request: Request, response: Response): Promise<Response> {
    const { motivo_cancelamento, situacao } = request.body
    const { id } = request.params
    const service = new ViajemServiceCancelar()
    const registro = await service.execute({id, motivo_cancelamento, situacao })
    return response.json(registro)
  }
}
