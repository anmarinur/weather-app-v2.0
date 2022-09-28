import dotenv from 'dotenv';
dotenv.config()

import jwt from 'jsonwebtoken'

//Generate a JWT
export const tokenGenerator = (id: number, name: string) => {

    return new Promise((resolve, reject) => {
        const payload = { id, name }

        jwt.sign(payload, process.env.SECRET || '', {
            expiresIn: '2h'
        }, (error, token) => {

            if (error) {
                console.log(error)
                reject("It wasn't possible to generate the token - token generator");
            }
            else {
                resolve(token)
            }
        })
    })
}