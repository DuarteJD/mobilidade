import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Viajem } from "./Viajem";

@Entity()
export class ViajemStatus {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  data: Date;

  @Column()
  status: number;

  @ManyToOne(type => Viajem, viajem => viajem.status)
  viajem: string;
}
