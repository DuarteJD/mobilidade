import { getCustomRepository } from "typeorm";
import { Request, Response } from "express";

import * as yup from "yup";

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

    console.log(`id => ${id} pagina => ${pagina} numero_registros=> ${numero_registros}`)

    const todos = tipo === 1 ? await repo.buscarTodosDoCliente({id, pagina, numero_registros }) : await repo.buscarTodosDoMotorista({id, pagina, numero_registros })

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

    const schema = yup.object().shape({

      latitude_de: yup
      .string()
      .required('Latitude do endereço de origem não informado'),

      longitude_de: yup
      .string()
      .required('Longitude do endereço de origem não informado'),

      endereco_de: yup
      .string()
      .required('Endereço de origem não informado'),

      latitude_para: yup
      .string()
      .required('Latitude do endereço de destino não informado'),

      longitude_para: yup
      .string()
      .required('Longitude do endereço de destino não informado'),

      endereco_destino: yup
      .string()
      .required('Endereço de destino não informado'),

      cliente: yup
      .string()
      .required('Cliente que solicitou a viajem não informado'),

      quantidade_passageiro: yup
      .number()
      .required('Número de passageiros não informado!'),

    });

    await schema.validate(corpo, {
      abortEarly: false,
    });

    const service = new ViajemServiceCriar()
    const registro = await service.execute(corpo)
    return response.json(registro)
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const corpo = request.body

    const schema = yup.object().shape({

      situacao: yup
      .number(),

      status_atual: yup
      .number(),

      latitude_de: yup
      .string(),

      longitude_de: yup
      .string(),

      endereco_de: yup
      .string(),

      latitude_para: yup
      .string(),

      longitude_para: yup
      .string(),

      endereco_destino: yup
      .string(),

      cliente: yup
      .string(),

      quantidade_passageiro: yup
      .number(),

    });

    await schema.validate(corpo, {
      abortEarly: false,
    });

    const service = new ViajemServiceAtualizar()
    const registro = await service.execute(id, corpo)
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
