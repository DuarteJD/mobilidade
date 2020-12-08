import { EntityRepository, Repository } from "typeorm";
import { Viajem } from '../entity/Viajem';


interface requestPorId {
  id: string;
  usuario: {
    id: string;
    tipo: number;
  };
}

interface requestBuscar{
  id: string;
  pagina?: number;
  numero_registros?: number;
}


@EntityRepository(Viajem)
class ViajemRepository extends Repository<Viajem> {

  public async buscarPorId({ id , usuario }: requestPorId): Promise<Viajem | undefined> {
    let registro: Viajem
    switch (usuario.tipo ) {
      case 1:
        registro = await this.findOne({ where: { id, cliente: usuario.id }, relations: ["veiculo", "motorista", "cliente", "status"]})
        break

      case 2:
        registro = await this.findOne({ where: { id, motorista: usuario.id }, relations: ["veiculo", "motorista", "cliente", "status"]})
        break
    }
    return registro;
  }

  public async buscarTodosDoMotorista({id, pagina = 1, numero_registros = 20}: requestBuscar): Promise<Viajem[] | undefined> {

    const offset = pagina === 1 ? 0 : (pagina - 1)  * numero_registros

    const registros = await this.find({
      where : { motorista: id },
      relations: ["veiculo", "cliente", "status"],
      order: {data: "DESC"},
      take: numero_registros,
      skip: offset
    })
    return registros;
  }

  public async buscarTodosDoCliente({id, pagina = 1, numero_registros = 20}: requestBuscar): Promise<Viajem[] | undefined> {

    const offset = pagina === 1 ? 0 : (pagina - 1)  * numero_registros

    const registros = await this.find({
      where : { cliente: id },
      relations: ["veiculo", "motorista", "status"],
      order: {data: "DESC"},
      take: numero_registros,
      skip: offset
    });
    return registros;
  }

  public async buscarTodosDaJornada({id, pagina = 1, numero_registros = 20}: requestBuscar): Promise<Viajem[] | undefined> {

    const offset = pagina === 1 ? 0 : (pagina - 1)  * numero_registros

    const registros = await this.find({
      where : { jornada: id },
      order: {data: "DESC"},
      take: numero_registros,
      skip: offset
    })
    return registros;
  }
}

export default ViajemRepository;
