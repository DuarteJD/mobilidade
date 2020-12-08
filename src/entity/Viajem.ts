import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Usuarios } from "./Usuarios";
import { Veiculos } from "./Veiculos";
import { Motivos } from "./Motivos";
import { Jornada } from "./Jornada";
import { ViajemStatus } from "./ViajemStatus";

@Entity()
export class Viajem {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  data: Date;

  @Column({ default: 0 })
  //0-Ativo
  //1-Cancelado motorista
  //2-Cancelado cliente
  //3-Cancelado central
  situacao: number;

  @Column({ default: 0 })
  //0-Aguardando aceitação
  //1-À caminho [ Motorista à caminho do endereço ]
  //2-Em rota [ Passageiro embarcou no veículo ]
  //3-Finalizada
  status_atual: number;

  @Column({ nullable: true })
  quantidade_passageiro: number;

  @Column()
  latitude_de: string;

  @Column()
  longitude_de: string;

  @Column()
  endereco_de: string;

  @Column()
  latitude_para: string;

  @Column()
  longitude_para: string;

  @Column()
  endereco_destino: string;

  @Column({ nullable: true, default: null })
  distancia_calculada: string;

  @Column({ nullable: true, default: null })
  distancia_percorrida: string;

  @Column({ nullable: true, default: null })
  tempo_estimado: string;

  @Column({ nullable: true, default: null })
  tempo_percorrido: string;

  @Column({ default: false })
  is_agendamento: boolean;

  @Column({ nullable: true, default: null })
  nota_motorista: number;

  @Column({ nullable: true, default: null })
  nota_cliente: number;

  @Column({ nullable: true, default: null })
  valor: number;

  @Column({ nullable: true, default: null })
  avatar_url: string;

  @ManyToOne(type => Usuarios, { nullable: true })
  cliente: string;

  @ManyToOne(type => Usuarios, { nullable: true })
  motorista: string;

  @ManyToOne(type => Veiculos, { nullable: true })
  veiculo: string;

  @ManyToOne(type => Motivos, { nullable: true })
  motivo_cancelamento: string;

  @ManyToOne(type => Jornada, { nullable: true })
  jornada: string;

  @OneToMany(type => ViajemStatus, viajemStatus => viajemStatus.viajem, {
    cascade: true
  })
  status: ViajemStatus[];
}
