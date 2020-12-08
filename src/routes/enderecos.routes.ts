import { Router } from 'express';

import  EnderecoFavoritoController  from '../controller/EnderecoFavoritoController';

const routes = Router();
const controladorEntidade = new EnderecoFavoritoController();

routes.get('/', controladorEntidade.all);
routes.get('/:id', controladorEntidade.one);

routes.post('/', controladorEntidade.save);
routes.put('/:id', controladorEntidade.update);
routes.delete('/:id', controladorEntidade.remove);

export default routes;
