import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Usuarios } from './Usuarios';
import { Veiculos } from './Veiculos';

@Entity()
export class Jornada {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: 'data_inicial'})
  data_inicial: Date;

  @Column({ name: 'data_final', nullable: true})
  data_final: Date;

  @Column({ default: true, name: "is_trabalhando" })
  is_trabalhando: boolean;

  @Column({ default: false, name: "is_integrado" })
  is_integrado: boolean;

  @ManyToOne(type => Usuarios)
  motorista: string;

  @ManyToOne(type => Veiculos)
  veiculo: string;

  @Column({ nullable: true, name: "quantidade_total_viajens" })
  quantidade_total_viajens: number;

  @Column({ nullable: true, name: "quantidade_total_vidas" })
  quantidade_total_vidas: number;

  @Column({ nullable: true, name: "valor_total_viajens" })
  valor_total_viajens: number;

  @Column({ nullable: true, name: "latitude_inicial" })
  latitude_inicial: string;

  @Column({ nullable: true, name: "longitude_inicial" })
  longitude_inicial: string;

  @Column({ nullable: true, name: "latitude_final" })
  latitude_final: string;

  @Column({ nullable: true, name: "longitude_final" })
  longitude_final: string;

}
