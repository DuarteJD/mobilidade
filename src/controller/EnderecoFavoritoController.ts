import { getCustomRepository } from "typeorm";
import { Request, Response } from "express";

import EnderecoFavoritoRepository from '../repositories/EnderecoFavoritoRepository';
import EnderecoFavoritoServiceCriar from '../services/EnderecoFavoritoServiceCriar'
import EnderecoFavoritoServiceAtualizar from "../services/EnderecoFavoritoServiceAtualizar";
import EnderecoFavoritoServiceExcluir from "../services/EnderecoFavoritoServiceExcluir";

export default class EnderecoFavoritoController {

  public async all(request: Request, response: Response): Promise<Response> {
    const usuario = request.usuario.id
    const todos = await getCustomRepository(EnderecoFavoritoRepository).buscarTodosPorUsuario(usuario)
    return response.json(todos)
  }

  public async one(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const usuario = request.usuario.id
    const umRegistro = await getCustomRepository(EnderecoFavoritoRepository).buscarPorId({ id, usuario })
    return response.json(umRegistro)
  }

  async save(request: Request, response: Response): Promise<Response> {
    const corpo = request.body
    const service = new EnderecoFavoritoServiceCriar()
    const registro = await service.execute(corpo)
    return response.json(registro)
  }

  async update(request: Request, response: Response): Promise<Response> {
    const usuario = request.usuario.id
    const { id } = request.params
    const { nome, latitude, longitude } = request.body

    const service = new EnderecoFavoritoServiceAtualizar()
    const registro = await service.execute({ id, nome, latitude, longitude, usuario})
    return response.json(registro)
  }

  async remove(request: Request, response: Response): Promise<Response> {
    const usuario = request.usuario.id
    const { id } = request.params
    const service = new EnderecoFavoritoServiceExcluir()
    await service.execute({ id, usuario})
    return response.status(204).json()
  }
}

