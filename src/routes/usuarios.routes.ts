import { Router } from 'express';
import * as multer from 'multer';

import UsuariosController  from '../controller/UsuariosController';
import autenticacaoJwt from '../middlewares/autenticacaoJwt';
import uploadConfig from '../config/Multer';

const routes = Router();
const upload = multer(uploadConfig);
const controladorEntidade = new UsuariosController();

routes.post('/', upload.single('imagem'), controladorEntidade.save);
routes.post('/reset-senha', controladorEntidade.senhaReset);
routes.get('/celular/:celular', controladorEntidade.porCelular);


routes.get('/', autenticacaoJwt, controladorEntidade.all);
routes.get('/:id', autenticacaoJwt, controladorEntidade.one);
routes.put('/:id', autenticacaoJwt, upload.single('imagem'), controladorEntidade.update);
routes.patch('/:id', autenticacaoJwt, controladorEntidade.novaLocalizacao);
routes.delete('/:id', autenticacaoJwt, controladorEntidade.remove);

export default routes;
