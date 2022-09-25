import { Response, Request } from "express";
import { tokenGenerator } from "../helpers/jwt-generator";

export const login = async (req: Request, res: Response) => {

    const {dataValues} = req.user
    
    try {

        const token = await tokenGenerator(dataValues.user_id, dataValues.first_name)
        
        res.json({
            ok: true,
            msg: 'succesfully logged in',
            uid: dataValues.user_id,
            name: dataValues.first_name,
            token,
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'please talk to the admin'
        })
    }

}

export const renewToken = async (req: Request, res: Response) => {

    const { id, name } = req.body

    const token = await tokenGenerator(id, name)

    return res.json({
        ok: true,
        id,
        name,
        token
    })
}
