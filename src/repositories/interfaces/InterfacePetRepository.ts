import PetEntity from "../../entities/PetEntity";

export default interface InterfacePetRepository {
    criarPet(pet:PetEntity): void;
    listaPet(): Promise<PetEntity[]> | PetEntity[];
    atualizaPet(id: number, pet: PetEntity): void;
    deletaPet(id: number, pet: PetEntity): void;
}