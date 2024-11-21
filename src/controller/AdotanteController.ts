import { Request, Response } from "express";
import AdotanteRepository from "../repositories/AdotanteRepository";
import AdotanteEntity from "../entities/AdotanteEntity";

export default class AdotanteController {
    constructor(private repository: AdotanteRepository) {}

    async criaAdotante(req: Request, res: Response) {
        try {
            const { nome, senha, celular, foto, endereco } = req.body as AdotanteEntity; 

            const novoAdotante = new AdotanteEntity(nome, senha, celular, foto, endereco);

            await this.repository.criaAdotante(novoAdotante);
            res.status(201).json(novoAdotante);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao criar o adotante' });
        }
    }

    async atualizaAdotante(req: Request, res: Response) {
        const { id } = req.params;
        const { success, message } = await this.repository.atualizaAdotante(Number(id), req.body as AdotanteEntity);
    
        if (!success) return res.status(404).json({ message });
            
        return res.sendStatus(204);
    }
    
    async listaAdotantes(req: Request, res: Response) {
        const listaDeAdotantes = await this.repository.listaAdotantes();
        return res.json(listaDeAdotantes);
    }
    
    async deletaAdotante(req: Request, res: Response) {
        const { id } = req.params;
    
        const { success, message } = await this.repository.deletaAdotante(Number(id));
    
        if (!success)  return res.status(404).json({ message });
        
        return res.sendStatus(204);
    }
}