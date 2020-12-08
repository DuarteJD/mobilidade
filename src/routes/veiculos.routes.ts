import { Router } from 'express';

import  VeiculosController  from '../controller/VeiculosController';

const routes = Router();
const controladorEntidade = new VeiculosController();

routes.get('/', controladorEntidade.all);
routes.get('/:id', controladorEntidade.one);

routes.post('/', controladorEntidade.save);
routes.put('/:id', controladorEntidade.update);
routes.delete('/:id', controladorEntidade.remove);

export default routes;
