import AdotanteEntity from "../entities/AdotanteEntity";

//Omit: Deixamos claro o que sera omitido.
type TipoRequestBodyAdotante = Omit<AdotanteEntity, "id" | "pets">;

type TipoRequestParamsAdotante = { id?:string };

//Pick: Conseguimos informar o que ira ser retornado.
type TipoResponseBodyAdotante = {
    data?: 
        Pick<AdotanteEntity, "id" | "nome" | "celular" > |
        Pick<AdotanteEntity, "id" | "nome" | "celular">[]

    error?: unknown;
};

export {
    TipoRequestBodyAdotante,
    TipoResponseBodyAdotante,
    TipoRequestParamsAdotante 
};