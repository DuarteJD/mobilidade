
import { Request, Response } from "express";
import SecaoServiceCriar from "../services/SecaoServiceCriar";
import UsuariosView from '../view/Usuarios';

export default class SessaoController {

  async save(request: Request, response: Response): Promise<Response> {

    const { email, senha } = request.body
    const service = new SecaoServiceCriar()
    const { usuario, token} = await service.execute({ email, senha })

    const usuarioView = UsuariosView.render(usuario);

    return response.json({ usuario: usuarioView , token})

  }
}
