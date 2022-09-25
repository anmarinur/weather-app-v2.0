import { Response, Request, NextFunction } from 'express';
import bcryptjs from 'bcryptjs';

import { User } from '../models/user';

export const credentialsValidator = async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body
    
    //Verify if email exist
    const user = await User.findOne({ where: { email }})
    if (!user) {
        return res.status(400).json({
            ok: false,
            msg: "User or password is incorrect - wrong credentials"
        })
    }

    //Verify password
    const isValidPassword = bcryptjs.compareSync(password, user.password)
    if (!isValidPassword) {
        return res.status(400).json({
            ok: false,
            msg: "User or password is incorrect - wrong password"
        })
    }

    req.user = user
    
    next()
}