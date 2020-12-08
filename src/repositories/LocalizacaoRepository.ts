import { EntityRepository, Repository } from "typeorm";
import { Localizacao } from '../entity/Localizacao';

interface requestPorId {
  id: string;
  usuario: string;
}

@EntityRepository(Localizacao)
class LocalizacaoRepository extends Repository<Localizacao> {

  public async buscarTodos(usuario: string): Promise<Localizacao[] | undefined> {
    const registros = await this.find({ where: { usuario }})
    return registros;
  }

  public async buscarPorId({id, usuario}: requestPorId): Promise<Localizacao | undefined> {
    const registros = await this.findOne({ where : { id, usuario}})
    return registros;
  }
}

export default LocalizacaoRepository;
