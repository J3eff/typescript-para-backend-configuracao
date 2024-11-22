import { Request, Response, NextFunction } from "express";
import * as yup from "yup";

const tratarErroValidacaoYup = (
    esquema: yup.Schema<unknown>,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        esquema.validateSync(req.body, { abortEarly: false });
        next();
    } catch (erros) {
        const errosYup = erros as yup.ValidationError;
        const errosDeVlidacao: Record<string, string> = {};
        errosYup.inner.forEach(erro => {
            if(erro.path)
                errosDeVlidacao[erro.path] = erro.message;
        });
    }
}

export default tratarErroValidacaoYup;