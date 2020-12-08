import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn
} from 'typeorm';

@Entity()
export class Motivos {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column({ default: true })
  is_ativo: boolean;

  @Column({ default: true })
  is_mostrar_cliente: boolean;

  @Column({ default: true })
  is_mostrar_motorista: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}
