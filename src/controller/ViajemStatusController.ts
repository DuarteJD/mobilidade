import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { ViajemStatus } from '../entity/ViajemStatus';

export default class ViajemStatusController {

  public async all(request: Request, response: Response): Promise<Response> {
    const todos = await getRepository(ViajemStatus).find();
    return response.json(todos)
  }

  public async one(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const umRegistro = await getRepository(ViajemStatus).findOne(id)
    return response.json(umRegistro)
  }
/*
  async save(request: Request, response: Response): Promise<Response> {
    const corpo = request.body
    const registro = await getRepository(ViajemStatus).save(corpo)
    return response.json(registro)
  }

  async update(request: Request, response: Response): Promise<Response> {

    const { id } = request.params
    const corpo = request.body
    const row = await getRepository(ViajemStatus).update(id, corpo)
    if(!row.affected) {
      return response.status(404).json({ message: 'Registro não encontrado!'})
    }

    const registro = await getRepository(ViajemStatus).findOne(id)
    return response.json(registro)
  }

  async remove(request: Request, response: Response): Promise<Response> {

    const { id } = request.params
    const remover = await getRepository(ViajemStatus).findOne(id)
    if(!remover) {
      return response.status(404).json({ message: 'Registro não encontrado para remoção!'})
    }

    await getRepository(ViajemStatus).remove(remover)
    return response.status(204).json()
  }
  */
}

