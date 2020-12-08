import { EntityRepository, Repository } from "typeorm";
import { Motivos } from '../entity/Motivos';

@EntityRepository(Motivos)
class MotivosRepository extends Repository<Motivos> {

  public async buscarPorNome(nome: string): Promise<Motivos | undefined> {
    const registro = await this.findOne({ where: { nome, is_ativo : true }})
    return registro;
  }

  public async buscarPorId(id: string): Promise<Motivos | undefined> {
    const registro = await this.findOne({ where: { id }})
    return registro;
  }

  public async buscarTodos(): Promise<Motivos[] | undefined> {
    const registros = await this.find({ where: { is_ativo: true }})
    return registros;
  }
}

export default MotivosRepository;
