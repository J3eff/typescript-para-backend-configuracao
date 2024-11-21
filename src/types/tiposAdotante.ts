import AdotanteEntity from "../entities/AdotanteEntity";

//Omit: Deixamos claro o que sera omitido.
type TipoRequestBodyAdotante = Omit<AdotanteEntity, "id">;

//Pick: Conseguimos informar o que ira ser retornado.
type TipoResponseBodyAdotante = {
    data?: Pick<AdotanteEntity, "id" | "nome" | "celular">    
};

export {TipoRequestBodyAdotante, TipoResponseBodyAdotante };