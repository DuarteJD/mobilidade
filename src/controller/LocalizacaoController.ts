import { getCustomRepository } from "typeorm";
import { Request, Response } from "express";
import  LocalizacaoRepository from '../repositories/LocalizacaoRepository';
import LocalizacaoServiceCriar from "../services/LocalizacaoServiceCriar";
import LocalizacaoServiceExcluir from "../services/LocalizacaoServiceExcluir";

export default class LocalizacaoController {

  public async all(request: Request, response: Response): Promise<Response> {
    const usuario = request.usuario.id
    const todos = await getCustomRepository(LocalizacaoRepository).buscarTodos(usuario)
    return response.json(todos)
  }

  public async one(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const usuario = request.usuario.id
    const umRegistro = await getCustomRepository(LocalizacaoRepository).buscarPorId({id, usuario})
    return response.json(umRegistro)
  }

  async save(request: Request, response: Response): Promise<Response> {
    const {data, direcao, latitude, longitude, precisao, velocidade} = request.body
    const usuario = request.usuario.id

    const service = new LocalizacaoServiceCriar()
    const registro = await service.execute({data, direcao, latitude, longitude, precisao, velocidade, usuario})
    return response.json(registro)
  }

  async remove(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const usuario = request.usuario.id

    const service = new LocalizacaoServiceExcluir()
    await service.execute({id,usuario})
    return response.status(204).json()
  }
}

