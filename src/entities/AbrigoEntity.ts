import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import EnderecoEntity from "./Endereco";
import PetEntity from "./PetEntity";
import { criarSenhaCriptografada } from "../utils/senhaCriptografada";

@Entity()
export default class AbrigoEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    nome: string;
    @Column()
    email: string;    
    @Column()
    celular: string;
    @Column()
    senha: string;
    
    @OneToOne(() => EnderecoEntity, {
        nullable: true,
        cascade: true,
        eager: true    
    })
    @JoinColumn()
    endereco?: EnderecoEntity;

    @OneToMany(() => PetEntity, (pet) => pet.abrigo)
    pets!: PetEntity[];

    constructor(
        nome:string,
        email:string,
        celular:string,
        senha: string,
        endereco?: EnderecoEntity
    ) {
        this.nome = nome;
        this.email = email;
        this.celular = celular;
        this.senha = senha;
        this.endereco = endereco;
    }

    @BeforeInsert()
    @BeforeUpdate()
    private async criptografarSenha() {
        if (this.senha)
            this.senha = criarSenhaCriptografada(this.senha);
    }
}