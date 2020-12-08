import { EntityRepository, Repository } from "typeorm";
import { Jornada } from '../entity/Jornada';

interface requestPorId {
  id: string;
  motorista: string;
}

@EntityRepository(Jornada)
class JornadaRepository extends Repository<Jornada> {

  public async buscarTodos(motorista: string): Promise<Jornada[] | undefined> {
    const registros = await this.find({ where: { motorista }, relations: ["veiculo"]})
    return registros;
  }

  public async buscarNovas(): Promise<Jornada[] | undefined> {
    const registros = await this.find({ where: { is_integrado: false }, relations: ["veiculo", "motorista"]})
    return registros;
  }

  public async buscarJornadaEmAberto(motorista: string): Promise<Jornada | undefined> {
    const registros = await this.findOne({ where: { motorista, is_trabalhando: true }, relations: ["veiculo"]})
    return registros;
  }

  public async buscarPorId({id, motorista}: requestPorId): Promise<Jornada | undefined> {
    const registros = await this.findOne({ where : { id, motorista}, relations: ["veiculo"]})
    return registros;
  }
}

export default JornadaRepository;
