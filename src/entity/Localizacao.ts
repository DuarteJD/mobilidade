import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne
} from 'typeorm';

import { Usuarios } from './Usuarios';

@Entity()
export class Localizacao {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  data: Date;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @Column({ nullable: true })
  precisao: string;

  @Column({ nullable: true })
  velocidade: string;

  @Column({ nullable: true })
  direcao: string;

  @ManyToOne(type => Usuarios)
  usuario: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}
