import { Router } from 'express';

import  JornadaController  from '../controller/JornadaController';

const routes = Router();
const controladorEntidade = new JornadaController();

routes.get('/novas', controladorEntidade.novas);
routes.get('/', controladorEntidade.all);
routes.get('/:id', controladorEntidade.one);
routes.post('/', controladorEntidade.save);
routes.put('/:id', controladorEntidade.finalizar);

export default routes;
