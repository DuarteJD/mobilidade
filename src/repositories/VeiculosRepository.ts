import { EntityRepository, Repository } from "typeorm";
import { Veiculos } from '../entity/Veiculos';

interface requestPorId {
  id: string;
  usuario: string;
}

@EntityRepository(Veiculos)
class VeiculosRepository extends Repository<Veiculos> {

  public async buscarPorId({id, usuario}: requestPorId): Promise<Veiculos | undefined> {
    const registro = await this.findOne({ where: { id, motorista: usuario }})
    return registro;
  }

  public async buscarPorPlaca(placa: string): Promise<Veiculos | undefined> {
    const registro = await this.findOne({ where: { placa }})
    return registro;
  }

  public async buscarTodos(usuario): Promise<Veiculos[] | undefined> {
    const registros = await this.find({ where: { is_ativo: true, motorista: usuario }})
    return registros;
  }
}

export default VeiculosRepository;
