import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import  TratamentoDeErros  from "../errors/TratamentoDeErros";
interface tokenJTW {
  iat: number;
  exp: number;
  sub: string;
  tipo: number;
}

export default function autenticacaoJwt(request: Request, response: Response, next: NextFunction): void {

  const token = request.headers.authorization;

  if(!token) {
    throw new TratamentoDeErros('Token JWT não encontrado!', 401)
  }

  const [, jwt] = token.split(' ')

  try {
    const validacao = verify(jwt, process.env.SECRET_JWT)

    const { sub, tipo } = validacao as tokenJTW

    request.usuario = {
      id: sub,
      tipo
    }

    return next()
  } catch (error) {
    throw new TratamentoDeErros('O Token informado encontra-se inválido!', 401 )
  }
}
