import { Router } from 'express';

import  SecaoController  from '../controller/SecaoController';

const routes = Router();
const controladorEntidade = new SecaoController();

routes.post('/', controladorEntidade.save);

export default routes;
