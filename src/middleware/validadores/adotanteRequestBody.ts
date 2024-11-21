import { Request, Response, NextFunction } from "express";
import { TipoRequestBodyAdotante } from "../../types/tiposAdotante";
import * as yup from "yup";

const esquemaBodyAdotante: yup.ObjectSchema<Omit<TipoRequestBodyAdotante, "endereco">> = yup.object({
    nome: yup.string().defined().required(),
    celular: yup.string().defined().required(),
    senha: yup.string().defined().required().min(6),
    foto: yup.string().optional(),
});

const middlewareValidadorBodyAdotante = async (req: Request, res:Response, next: NextFunction) => {
    try {
        await esquemaBodyAdotante.validate(req.body,  { abortEarly: false })
        return next();
    } catch (error) {
        const yupErrors = error as yup.ValidationError;
        const validationErrors: Record<string, string>= {};
        yupErrors.inner.forEach(err =>  {
            if(!err.path) return;
            validationErrors[err.path] = err.message;
        })

        return res.status(400).json({ error: validationErrors })
    }
}

export { middlewareValidadorBodyAdotante };