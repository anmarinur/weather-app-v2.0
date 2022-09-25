import { Response, Request } from "express";
import { tokenGenerator } from "../helpers/jwt-generator";

export const login = async (req: Request, res: Response) => {

    const user = req.user
    
    try {

        const token = await tokenGenerator(user.id, user.name)

        res.json({
            ok: true,
            msg: 'succesfully logged in',
            uid: user.user_id,
            name: user.first_name,
            token
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
