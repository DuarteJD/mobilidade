import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Usuarios } from "./Usuarios";

@Entity()
export class Veiculos {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  nome: string;

  @Column({ nullable: true})
  marca: string;

  @Column({ nullable: true})
  placa: string;

  @Column({ nullable: true})
  ano: string;

  @Column({ nullable: true})
  cor: string;

  @Column({ default: false })
  is_aprovado: boolean;

  @Column({ default: true })
  is_ativo: boolean;

  @ManyToOne(type => Usuarios, motorista => motorista.veiculos)
  motorista: string;

}
