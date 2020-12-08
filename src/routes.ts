import { Router } from "express";

import motivosRouter from './routes/motivos.routes';
import usuariosRouter from './routes/usuarios.routes';
import enderecosRouter from './routes/enderecos.routes';
import veiculosRouter from './routes/veiculos.routes';
import localizacaoRouter from './routes/localizacao.routes';
import jornadaRouter from './routes/jornada.routes';
import viajemRouter from './routes/viajem.routes';
import viajemStatusRouter from './routes/viajemstatus.routes';
import secaoRouter from './routes/secao.routes';

import autenticacaoJwt from './middlewares/autenticacaoJwt';

const routes = Router();

routes.use('/login', secaoRouter);
routes.use('/usuarios', usuariosRouter);

routes.use('/motivos', autenticacaoJwt, motivosRouter);
routes.use('/enderecos', autenticacaoJwt, enderecosRouter);
routes.use('/veiculos', autenticacaoJwt, veiculosRouter);
routes.use('/localizacao', autenticacaoJwt, localizacaoRouter);
routes.use('/jornada', autenticacaoJwt, jornadaRouter);
routes.use('/viajem', autenticacaoJwt, viajemRouter);
routes.use('/viajem-status', autenticacaoJwt, viajemStatusRouter);

//validar as entradas
//enviar e-mail para o usuário após um novo cadastro.

export default routes;
