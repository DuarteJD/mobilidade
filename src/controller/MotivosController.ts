import { getCustomRepository } from "typeorm";
import { Request, Response } from "express";

import MotivosRepository from '../repositories/MotivosRepository';
import MotivosServiceCriar from '../services/MotivosServiceCriar'
import MotivosServiceAtualizar from "../services/MotivosServiceAtualizar";
import MotivosServiceExcluir from "../services/MotivosServiceExcluir";

export default class MotivosController {

  public async all(request: Request, response: Response): Promise<Response> {
    const todos = await getCustomRepository(MotivosRepository).buscarTodos();
    return response.json(todos)
  }

  public async one(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const umRegistro = await getCustomRepository(MotivosRepository).buscarPorId(id)
    return response.json(umRegistro)
  }

  async save(request: Request, response: Response): Promise<Response> {
    const corpo = request.body
    const service = new MotivosServiceCriar()
    const registro = await service.execute(corpo)
    return response.json(registro)
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { nome, is_mostrar_cliente, is_mostrar_motorista } = request.body
    const { id } = request.params

    const service = new MotivosServiceAtualizar()
    const registro = await service.execute({ id, nome, is_mostrar_cliente, is_mostrar_motorista})
    return response.json(registro)
  }

  async remove(request: Request, response: Response): Promise<Response> {

    const { id } = request.params
    const service = new MotivosServiceExcluir()
    await service.execute({id})
    return response.status(204).json()

  }
}
