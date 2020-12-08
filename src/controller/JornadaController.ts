import { getCustomRepository } from "typeorm";
import { Request, Response } from "express";
import JornadaRepository from '../repositories/JornadaRepository';
import JornadaServiceCriar from "../services/JornadaServiceCriar";
import JornadaServiceFinalizar from "../services/JornadaServiceFinalizar";

export default class JornadaController {

  public async all(request: Request, response: Response): Promise<Response> {
    const usuario = request.usuario.id
    const todos = await getCustomRepository(JornadaRepository).buscarTodos(usuario)
    return response.json(todos)
  }

  public async novas(request: Request, response: Response): Promise<Response> {
    const todos = await getCustomRepository(JornadaRepository).buscarNovas()
    return response.json(todos)
  }

  public async one(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const motorista = request.usuario.id
    const umRegistro = await getCustomRepository(JornadaRepository).buscarPorId({id, motorista})
    return response.json(umRegistro)
  }

  async save(request: Request, response: Response): Promise<Response> {
    const {data_inicial, latitude_inicial, longitude_inicial, veiculo } = request.body
    const motorista = request.usuario.id
    const service = new JornadaServiceCriar()
    const registro = await service.execute({ data_inicial,latitude_inicial,longitude_inicial,motorista,veiculo })
    return response.json(registro)
  }

  async finalizar(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const {data_final, latitude_final, longitude_final, quantidade_total_viajens, quantidade_total_vidas, valor_total_viajens } = request.body
    const motorista = request.usuario.id

    const service = new JornadaServiceFinalizar()
    const registro = await service.execute({ id, data_final,latitude_final,longitude_final,quantidade_total_viajens,quantidade_total_vidas,valor_total_viajens,motorista })
    return response.json(registro)
  }
}
