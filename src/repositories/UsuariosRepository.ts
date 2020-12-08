import { EntityRepository, Repository } from "typeorm";
import { Usuarios } from '../entity/Usuarios';

@EntityRepository(Usuarios)
class UsuariosRepository extends Repository<Usuarios> {

  public async buscarTodos(id: string): Promise<Usuarios[] | undefined> {
    const registro = await this.find({ relations: ["veiculos", "enderecos", "ultima_localizacao"], where: { id }}  );
    return registro;
  }

  public async buscarUm(id: string): Promise<Usuarios | undefined> {
    const registro = await this.findOne({ relations: ["veiculos", "enderecos", "ultima_localizacao"], where: { id }}  );
    return registro;
  }

  public async buscarPorEmail(email: string): Promise<Usuarios | undefined> {
    const registro = await this.findOne({ where: { email }})
    return registro;
  }

  public async buscarPorCelular(celular: string): Promise<Usuarios | undefined> {
    const registro = await this.findOne({ where: { celular }})
    return registro;
  }
}

export default UsuariosRepository;
