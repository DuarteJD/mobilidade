import { Router } from 'express';

import  LocalizacaoController  from '../controller/LocalizacaoController';

const routes = Router();
const controladorEntidade = new LocalizacaoController();

routes.get('/', controladorEntidade.all);
routes.get('/:id', controladorEntidade.one);
routes.post('/', controladorEntidade.save);
routes.delete('/:id', controladorEntidade.remove);

export default routes;
