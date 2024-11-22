import PetEntity from "../../entities/PetEntity";

export default interface InterfacePetRepository {
    criarPet(pet:PetEntity): void | Promise<void>;
    listaPet(): Promise<PetEntity[]> | PetEntity[];
    atualizaPet(id: number, newData: PetEntity): void;

    deletaPet(id: number): void;
    adotaPet(idPet: number, idAdotante: number): void;

    buscaPetPorCoampoGenerico<Tipo extends keyof PetEntity>(
        campo: Tipo, 
        valor: PetEntity[Tipo]
    ): Promise<PetEntity[] | PetEntity[]>;
}