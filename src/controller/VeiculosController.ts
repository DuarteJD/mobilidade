import { getCustomRepository } from "typeorm";
import { Request, Response } from "express";

import VeiculosRepository  from '../repositories/VeiculosRepository'
import VeiculosServiceCriar from "../services/VeiculosServiceCriar";
import VeiculosServiceAtualizar from "../services/VeiculosServiceAtualizar";
import VeiculosServiceExcluir from "../services/VeiculosServiceExcluir";

export default class VeiculosController {

  public async all(request: Request, response: Response): Promise<Response> {
    const usuario = request.usuario.id
    const todos = await getCustomRepository(VeiculosRepository).buscarTodos(usuario)
    return response.json(todos)
  }

  public async one(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const usuario = request.usuario.id
    const umRegistro = await getCustomRepository(VeiculosRepository).buscarPorId({ id, usuario})
    return response.json(umRegistro)
  }

  async save(request: Request, response: Response): Promise<Response> {
    const corpo = request.body
    const service = new VeiculosServiceCriar()
    const registro = await service.execute(corpo)
    return response.json(registro)
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { nome, ano, placa, cor, marca, is_aprovado } = request.body
    const usuario = request.usuario.id

    const service = new VeiculosServiceAtualizar()
    const registro = await service.execute({ id, nome, ano, cor, marca, placa, motorista: usuario, is_aprovado })
    return response.json(registro)
  }

  async remove(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const usuario = request.usuario.id

    const service = new VeiculosServiceExcluir()
    await service.execute({id, motorista: usuario})
    return response.status(204).json()
  }
}
