import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import EnderecoEntity from "./Endereco";
import PetEntity from "./PetEntity";

@Entity()
export default class AdotanteEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    nome: string;
    @Column()
    senha: string;
    @Column()
    celular: string;
    @Column({ nullable: true })
    foto?: string;

    //eager quando lsitar um adotante não precisamos procurar o relacionamento, ele faz automatico.
    @OneToOne(() => EnderecoEntity, {
        nullable: true,
        cascade: true,
        eager: true,
      })
    @JoinColumn()
    endereco?: EnderecoEntity;  

    @OneToMany(() => PetEntity, (pet) => pet.adotante)
    pets!: PetEntity[]

    constructor(
        nome: string,
        senha: string,
        celular: string,
        foto?: string,
        endereco?: EnderecoEntity
    ) {
        this.nome = nome;
        this.senha = senha;
        this.celular = celular;
        this.foto = foto;
        this.endereco = endereco;
    }
}