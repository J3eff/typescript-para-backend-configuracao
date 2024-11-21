import * as yup from "yup";
import { Request, Response, NextFunction } from "express";
import EnderecoEntity from "../../entities/Endereco";
import { pt } from "yup-locale-pt";

yup.setLocale(pt);

const esquemaBodyEndereco: yup.ObjectSchema<Omit<EnderecoEntity, "id">> = yup.object({
    cidade: yup.string().defined().required(),
    estado: yup.string().defined().required()
});

const middlewareValidadorBodyEndereco = async (req: Request, res:Response, next: NextFunction) => {
    try {
        await esquemaBodyEndereco.validate(req.body,  { abortEarly: false })
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

export { middlewareValidadorBodyEndereco };