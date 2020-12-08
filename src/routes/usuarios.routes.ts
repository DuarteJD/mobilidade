import { Router } from 'express';
import * as multer from 'multer';

import  UsuariosController  from '../controller/UsuariosController';
import autenticacaoJwt from '../middlewares/autenticacaoJwt';
import uploadConfig from '../config/Multer';

const routes = Router();
const upload = multer(uploadConfig);
const controladorEntidade = new UsuariosController();

routes.post('/', upload.single('imagem'), controladorEntidade.save);
routes.get('/celular/:celular', controladorEntidade.porCelular);

routes.use(autenticacaoJwt);
routes.get('/', controladorEntidade.all);
routes.get('/:id', controladorEntidade.one);
routes.put('/:id', upload.single('imagem'), controladorEntidade.update);
routes.patch('/:id', controladorEntidade.novaLocalizacao);
routes.delete('/:id', controladorEntidade.remove);

export default routes;
