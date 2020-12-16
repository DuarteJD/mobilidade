import { getCustomRepository } from "typeorm";
import UsuariosRepository from "../repositories/UsuariosRepository";
import { compare } from "bcryptjs";
import { Usuarios } from "../entity/Usuarios";
import { sign } from "jsonwebtoken";

import  TratamentoDeErros  from "../errors/TratamentoDeErros";

interface Request {
  email: string
  senha: string
}

interface Response {
  usuario: Usuarios
  token: string
}

class SecaoServiceCriar {
  public async execute({ email, senha} : Request) : Promise<Response> {

    const respository = getCustomRepository(UsuariosRepository)

    const registro = await respository.buscarPorEmail(email)

    if(!registro) {
      throw new TratamentoDeErros('Combinação de e-mail e senha não foram encontrados!', 401)
    }

    const isSenhaValida = await compare(senha, registro.senha)

    if(!isSenhaValida) {
      if(registro.senha_temporaria) {

        const isSenhaTemporariaValida = await compare(senha, registro.senha_temporaria)
        if(!isSenhaTemporariaValida) {
          throw new TratamentoDeErros('Combinação de e-mail e senha temporária não foram encontrados!', 401)
        }
      } else {
        throw new TratamentoDeErros('Combinação de e-mail e senha não foram encontrados!', 401)
      }
    }

    const jwt = sign({
      nome: registro.nome,
      email: registro.email,
      tipo: registro.tipo },
      process.env.SECRET_JWT,
      {
        subject: registro.id,
        expiresIn: process.env.EXPIRACAO
      });

    return {usuario: registro, token: jwt}

  }
}

export default SecaoServiceCriar;
