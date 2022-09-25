import dotenv from 'dotenv';
dotenv.config()

import { NextFunction, Request, Response  } from "express"
import jwt  from "jsonwebtoken"
import { User } from '../models/user';

export const jwtValidator = async (req: Request, res: Response, next: NextFunction) => {

    const token = req.header('x-weather-token')
    
    if (!token) {
        return res.status(400).json({
            ok: false,
            msg: 'token is missing - token validator'
        })
    }

    try {
        //@ts-ignore
        const { id, name } = jwt.verify(token, process.env.SECRET || '')

        req.user = await User.findAll({where: { user_id: id}}) 

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'invalid token - token validator'
        })
    }

    next()
}
