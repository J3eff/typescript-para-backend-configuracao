import { Request, Response } from "express";
import type TipoPet from "../types/TipoPet";

let listaDePets: Array<TipoPet> = [];

export default class PetController {
    criaPet(req: Request, res: Response) {
        const { id, adotado, idade, especie, nome} = <TipoPet>req.body;
        const novoPet = { id, adotado, idade, especie, nome};
        listaDePets.push(novoPet);
        return res.status(201).json(novoPet);
    } 
}