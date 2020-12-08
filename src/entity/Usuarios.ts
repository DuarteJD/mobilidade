import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Localizacao } from './Localizacao';
import { Veiculos } from './Veiculos';
import { EnderecoFavorito } from './EnderecoFavorito';

@Entity()
@Unique(['email'])
export class Usuarios {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  nome: string;

  @Column()
  apelido: string;

  @Column({ unique: true })
  email: string;

  @Column()
  tipo: number;

  @Column()
  celular: string;

  @Column()
  senha: string;

  @Column({ nullable: true, default: null })
  cpf: string;

  @Column({ nullable: true, default: null })
  rg: string;

  @Column({ nullable: true, default: null })
  avatar_url: string;

  @OneToOne(type => Localizacao)
  @JoinColumn({name: "ultima_localizacao"})
  ultima_localizacao: Localizacao;

  @OneToMany(type => Veiculos, veiculos => veiculos.motorista)
  veiculos: Veiculos[];

  @OneToMany(type => EnderecoFavorito, enderecos => enderecos.usuario)
  enderecos: EnderecoFavorito[];

}
