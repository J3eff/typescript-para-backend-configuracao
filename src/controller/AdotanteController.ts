import { Request, Response } from "express";
import AdotanteRepository from "../repositories/AdotanteRepository";
import AdotanteEntity from "../entities/AdotanteEntity";

export default class AdotanteController {
    constructor(private repository: AdotanteRepository) {}

    async criarAdotante(req: Request, res: Response) {
        try {
            const { nome, senha, celular, foto, endereco } = req.body as AdotanteEntity; 

            const novoAdotante = new AdotanteEntity(nome, senha, celular, foto, endereco);

            await this.repository.criarAdotante(novoAdotante);
            res.status(201).json(novoAdotante);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao criar o adotante' });
        }
    }
}