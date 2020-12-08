import { Router } from 'express';

import  ViajemController  from '../controller/ViajemController';

const routes = Router();
const controladorEntidade = new ViajemController();

routes.get('/', controladorEntidade.all);
routes.get('/:id', controladorEntidade.one);

routes.post('/', controladorEntidade.save);
routes.put('/:id', controladorEntidade.update);
routes.patch('/:id', controladorEntidade.cancelar);

export default routes;
