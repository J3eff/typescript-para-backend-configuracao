import { Request, Response } from "express";
import type TipoPet from "../types/TipoPet";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";

let listaDePets: Array<TipoPet> = [];

let id = 0;
function geraId() {
  id = id + 1;
  return id;
}

export default class PetController {
    constructor(private repository: PetRepository) {}

    criaPet(req: Request, res: Response) {
        const { adotado, dataDeNascimento, especie, nome} = <TipoPet>req.body;
        
        if(!Object.values(EnumEspecie).includes(especie))
            return res.status(400).json({ error: "Especie inválida!"})

        const novoPet = { id: geraId(), adotado, dataDeNascimento, especie, nome };
        this.repository.criarPet(novoPet);
        return res.status(201).json(novoPet);
    } 

    listaPets(req: Request, res:Response) {
        return res.status(200).json(listaDePets);
    }

    atualizaPet(req: Request, res:Response) {
        const { id } = req.params;
        const { adotado, especie, dataDeNascimento, nome } = req.body as TipoPet;
        const pet = listaDePets.find((pet) => pet.id == Number(id));
        if(!pet)
            return res.status(404).json({ erro: "Pet não encontrado" });

        pet.nome = nome;
        pet.dataDeNascimento = dataDeNascimento;
        pet.especie = especie;
        pet.adotado = adotado;
        return res.status(200).json(pet);
    }

    deletaPet(req: Request, res:Response) {
        const { id } = req.params;
        const pet = listaDePets.find(pet => pet.id == Number(id));
        if(!pet)
            return res.status(404).json({ erro: "Pet não encontrado" });

        const index = listaDePets.indexOf(pet);
        listaDePets.splice(index, 1);
        return res.status(200).json({ mensagem: "Pet deletado com sucesso" });
    }
}