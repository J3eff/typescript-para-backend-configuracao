import { Request, Response } from "express";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";
import EnumPorte from "../enum/EnumPorte";
import { TipoRequestBodyPet, TipoRequestParamsPet, TipoResponseBodyPet } from "../types/tiposPet";

export default class PetController {
    constructor(private repository: PetRepository) {}

    async criaPet(
        req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>,
        res: Response<TipoResponseBodyPet>
    ) {
        const { adotado, dataDeNascimento, especie, porte, nome} = <PetEntity>req.body;
        const novoPet = new PetEntity(nome, especie, dataDeNascimento, adotado, porte);
        await this.repository.criarPet(novoPet);
        return res.status(201).json({ dados: { id: novoPet.id, nome, especie, porte } });
    } 

    async listaPets(
        req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>,
        res: Response<TipoResponseBodyPet>
    ) {
        const listaDePets = await this.repository.listaPet();
        const dados = listaDePets.map(pet => {
            return {
                id: pet.id,
                nome: pet.nome,
                especie: pet.especie,
                porte: pet.porte !== null ? pet.porte : undefined
            }
        });
        return res.status(200).json({ dados });
    }

    async atualizaPet(
        req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>,
        res: Response<TipoResponseBodyPet>
    ) {
        const { id } = req.params;
        const { success, message } = await this.repository.atualizaPet(Number(id),req.body as PetEntity);

        if(!success)
            return res.status(404).json({ erros: message })

        return res.sendStatus(204);
    }

    async deletaPet(
        req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>,
        res: Response<TipoResponseBodyPet>
    ) {
        const { id } = req.params;
        const { success, message } = await this.repository.deletaPet(Number(id));

        if(!success) return res.status(404).json({ erros: message });

        return res.sendStatus(200);
    }

    async adotaPet(
        req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>,
        res: Response<TipoResponseBodyPet>
    ) {
        const { pet_id, adotante_id } = req.params;

        const { success, message } = await this.repository.adotaPet(
            Number(pet_id),
            Number(adotante_id)
        );

        if(!success) return res.status(404).json({ erros: message })

        return res.sendStatus(204);
    }

    async buscaPetPorCoampoGenerico(req: Request, res: Response) {
        const { campo, valor } = req.query;
        const listaDePets = await this.repository.buscaPetPorCoampoGenerico(
            campo as keyof PetEntity,
            valor as string
        );

        return res.status(200).json(listaDePets);
    }
}