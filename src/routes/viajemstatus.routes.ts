import { Router } from 'express';

import  ViajemStatusController  from '../controller/ViajemStatusController';

const routes = Router();
const controladorEntidade = new ViajemStatusController();

routes.get('/', controladorEntidade.all);
routes.get('/:id', controladorEntidade.one);
/*
routes.post('/', controladorEntidade.save);
routes.put('/:id', controladorEntidade.update);
routes.delete('/:id', controladorEntidade.remove);
*/
export default routes;
