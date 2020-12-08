import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn
} from 'typeorm';
import { Usuarios } from './Usuarios';

@Entity()
export class EnderecoFavorito {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @OneToOne( type => Usuarios)
  @JoinColumn()
  usuario: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
