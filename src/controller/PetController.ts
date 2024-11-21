import { Request, Response } from "express";
import type TipoPet from "../types/TipoPet";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";

export default class PetController {
    constructor(private repository: PetRepository) {}

    async criaPet(req: Request, res: Response) {
        const { adotado, dataDeNascimento, especie, nome} = <PetEntity>req.body;
        
        if(!Object.values(EnumEspecie).includes(especie))
            return res.status(400).json({ error: "Especie inválida!"})

        const novoPet = new PetEntity(nome, especie, dataDeNascimento, adotado);
        await this.repository.criarPet(novoPet);

        return res.status(201).json(novoPet);
    } 

    async listaPets(req: Request, res:Response) {
        const listaDePets = await this.repository.listaPet();
        return res.status(200).json(listaDePets);
    }

    async atualizaPet(req: Request, res:Response) {
        const { id } = req.params;
        const { success, message } = await this.repository.atualizaPet(Number(id),req.body as PetEntity);

        if(!success)
            return res.status(404).json({ message })

        return res.sendStatus(204);
    }

    async deletaPet(req: Request, res:Response) {
        const { id } = req.params;
        const { success, message } = await this.repository.deletaPet(Number(id));

        if(!success)
            return res.status(404).json({ message })

        return res.sendStatus(200);
    }
}