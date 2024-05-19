import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/user';
import { City } from '../models/city';
import { tokenGenerator } from '../helpers/jwt-generator';

export const getUsers = async (req: Request, res: Response) => {

    try {
        const users = await User.findAll({
            where: {
                status: true
            },
            attributes: {
                exclude: [
                    'createdAt',
                    'updatedAt',
                    'password',
                    'status'
                ]
            },
            include: {
                through: { attributes: [] },
                model: City,
                attributes: {
                    exclude: [
                        'city_id',
                        'createdAt',
                        'updatedAt'
                    ]
                }
            }
        })

        res.json({
            ok: true,
            msg: 'Get all active users',
            users,
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Get all active users failed',
        });

    }
};

export const getUser = async (req: Request, res: Response) => {

    const { id } = req.params

    try {
        const user = await User.findByPk(id, {
            attributes: {
                exclude: [
                    'createdAt',
                    'updatedAt',
                    'password',
                ]
            },
            include: {
                through: { attributes: [] },
                model: City,
                attributes: {
                    exclude: [
                        'city_id',
                        'createdAt',
                        'updatedAt'
                    ]
                }
            }
        })

        if(!user?.status) {
            return res.status(401).json({
                ok: false,
                msg: 'The user is no longer active'
            })
        }

        res.json({
            ok: true,
            msg: 'Get user by ID',
            user
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Get user by Id failed',
        });
    }

};

export const createUser = async (req: Request, res: Response) => {

    const newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password
    }

    const salt = bcrypt.genSaltSync()
    newUser.password = bcrypt.hashSync(req.body.password, salt)

    try {
        const user = await User.create(newUser)
        const uId = user.user_id
        const name = user.first_name

        const token = await tokenGenerator(uId, name)

        res.status(201).json({
            ok: true,
            msg: 'User created',
            user,
            token
        });
    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'User creation failed, talk to the administrator',
            error
        });
    }
};

export const updateUser = async (req: Request, res: Response) => {

    const { id } = req.params
    const { first_name, last_name, password, email } = req.body

    const newInfo = {
        first_name,
        last_name,
        password,
        email,
    }

    if (password) {
        const salt = bcrypt.genSaltSync()
        newInfo.password = bcrypt.hashSync(password, salt)
    }

    try {
        
        const user = await User.findByPk(id)
        await user?.update(newInfo)

        res.status(200).json({
            ok: true,
            msg: 'Succesfully updated',
        });

    } catch (error) {
            res.status(500).json({
            ok: false,
            msg: 'Updating user failed',
        });   
    }
}
export const deleteUser = async (req: Request, res: Response) => {

    const { id } = req.params

    try {
        const user = await User.findByPk(id)
        await user?.update({status: false})
    
        res.status(200).json({
            ok: true,
            msg: 'Succesfully desactivated user',
        });

    } catch (error) {
                res.status(500).json({
            ok: false,
            msg: 'Deleting user failed',
        });
    }
};