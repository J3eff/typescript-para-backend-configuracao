import PetEntity from "../../entities/PetEntity";
import EnumPorte from "../../enum/EnumPorte";

export default interface InterfacePetRepository {
    criarPet(pet:PetEntity): void;
    listaPet(): Promise<PetEntity[]> | PetEntity[];
    atualizaPet(id: number, newData: PetEntity): Promise<{ success: boolean, message?: string}>;
    deletaPet(id: number): Promise<{ success: boolean, message?: string}>;
    adotaPet(idPet: number, idAdotante: number): Promise<{ success: boolean, message?: string}>
    buscaPetPeloPorte(porte:EnumPorte): Promise<PetEntity[]> | PetEntity[];
    buscaPetPorCoampoGenerico<Tipo extends keyof PetEntity>(campo: Tipo, valor: PetEntity[Tipo]): Promise<PetEntity[] | PetEntity[]>;
}