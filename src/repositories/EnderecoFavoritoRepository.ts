import { EntityRepository, Repository } from "typeorm";
import { EnderecoFavorito } from '../entity/EnderecoFavorito';

interface requestPorId {
  id: string;
  usuario: string;
}

interface requestPorNome {
  nome: string;
  usuario: string;
}

@EntityRepository(EnderecoFavorito)
class EnderecoFavoritoRepository extends Repository<EnderecoFavorito> {

  public async buscarPorId({id, usuario}:requestPorId ): Promise<EnderecoFavorito | undefined> {
    const registro = await this.findOne({ where: { id, usuario }})
    return registro;
  }

  public async buscarPorNome({nome, usuario}:requestPorNome ): Promise<EnderecoFavorito | undefined> {
    const registro = await this.findOne({ where: { nome, usuario }})
    return registro;
  }

  public async buscarTodosPorUsuario(usuario: string): Promise<EnderecoFavorito[] | undefined> {
    const registro = await this.find({ where: { usuario }, relations: ["usuario_id"]})
    return registro;
  }

}

export default EnderecoFavoritoRepository;
