import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";





const validateRequest = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {


        try {
            // validation check
            // if everything alright next() ->
            await schema.parseAsync({
                body: req.body
            });

            // return next();
            next();
        } catch (err) {
            next(err);
        }
    }
}



export default validateRequest