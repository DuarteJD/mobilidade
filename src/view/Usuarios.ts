import { Usuarios } from '../entity/Usuarios';

export default {
  render(usuario: Usuarios) {
    return {
      id: usuario.id,
      nome: usuario.nome,
      apelido: usuario.apelido,
      email: usuario.email,
      tipo: usuario.tipo,
      celular: usuario.celular,
      cpf: usuario.cpf,
      rg: usuario.rg,
      avatar_url: usuario.avatar_url === null ? null : `${process.env.STATIC_URL_UPLOADS}${usuario.avatar_url}`,
      veiculos: usuario.veiculos,
      enderecos: usuario.enderecos,
      ultima_localizacao: usuario.ultima_localizacao
    };
  },

  renderAll( usuarios: Usuarios[] ) {
    return usuarios.map(usuario => this.render(usuario))
  }
}
