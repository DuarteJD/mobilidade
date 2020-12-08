import { Router } from 'express';

import  MotivosController  from '../controller/MotivosController';

const routes = Router();
const controladorEntidade = new MotivosController();

routes.get('/', controladorEntidade.all);
routes.get('/:id', controladorEntidade.one);
routes.post('/', controladorEntidade.save);
routes.put('/:id', controladorEntidade.update);
routes.delete('/:id', controladorEntidade.remove);

export default routes;
