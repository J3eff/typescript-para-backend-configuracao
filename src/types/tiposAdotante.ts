import AdotanteEntity from "../entities/AdotanteEntity";

//Omit: Deixamos claro o que sera omitido.
type TipoRequestBodyAdotante = Omit<AdotanteEntity, "id" | "pets">;

type TipoRequestParamsAdotante = { id?:string };

//Pick: Conseguimos informar o que ira ser retornado.
type TipoResponseBodyAdotante = {
    dados?: 
        Pick<AdotanteEntity, "id" | "nome" | "celular" | "endereco" > |
        Pick<AdotanteEntity, "id" | "nome" | "celular" | "endereco">[]

    erros?: unknown;
};

export {
    TipoRequestBodyAdotante,
    TipoResponseBodyAdotante,
    TipoRequestParamsAdotante 
};