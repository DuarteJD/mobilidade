import { getCustomRepository } from "typeorm";
import { Request, Response } from "express";
import UsuariosRepository from "../repositories/UsuariosRepository";
import UsuarioServiceCriar from "../services/UsuarioServiceCriar";
import UsuarioServiceAtualizar from "../services/UsuarioServiceAtualizar";
import UsuarioServiceExcluir from "../services/UsuarioServiceExcluir";
import UsuarioServiceAtualizarLocalizacao from "../services/UsuarioServiceAtualizarLocalizacao";

import UsuariosView from '../view/Usuarios';

export default class UsuariosController {

  async all(request: Request, response: Response): Promise<Response> {
    const id = request.usuario.id
    const todos = await getCustomRepository(UsuariosRepository).buscarTodos(id)
    return response.json(UsuariosView.renderAll(todos))
  }

  async one(request: Request, response: Response): Promise<Response> {
    const id = request.usuario.id
    const umRegistro = await getCustomRepository(UsuariosRepository).buscarUm(id)
    return response.json(UsuariosView.render(umRegistro))
  }

  async porCelular(request: Request, response: Response): Promise<Response> {
    const { celular } = request.params
    const umRegistro = await getCustomRepository(UsuariosRepository).buscarPorCelular(celular)
    if(umRegistro) {
      return response.json(true)
    }
    return response.json(false)
  }

  async save(request: Request, response: Response): Promise<Response> {

    const corpo = request.body
    const requestImage = request.file
    const service = new UsuarioServiceCriar()

    let avatar_url;
    if(requestImage) {
      avatar_url =  requestImage.filename
    }

    const registro = await service.execute({...corpo, avatar_url })
    return response.json(UsuariosView.render(registro))
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { nome, apelido, email, tipo, celular, cpf, rg} = request.body
    const { id } = request.params
    const requestImage = request.file

    const service = new UsuarioServiceAtualizar()
    const registro = await service.execute({ id, nome, apelido, email, tipo, celular, cpf, rg, avatar_url : requestImage.filename})
    return response.json(UsuariosView.render(registro))
  }

  async novaLocalizacao(request: Request, response: Response): Promise<Response> {
    const { localizacao } = request.body
    const { id } = request.params

    const service = new UsuarioServiceAtualizarLocalizacao()
    const registro = await service.execute({ id, ultima_localizacao: {id: localizacao}})
    return response.json(UsuariosView.render(registro))
  }

  async remove(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const service = new UsuarioServiceExcluir()
    await service.execute({id})
    return response.status(204).json()
  }
}

