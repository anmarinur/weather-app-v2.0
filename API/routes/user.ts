import { Router } from 'express'
import { check } from 'express-validator';
import { getUsers, getUser, deleteUser, createUser, updateUser } from '../controllers/users';
import { dupEmail, validateId } from '../helpers/db-validators';
import { fieldValidator } from '../middleware/field-validator';
import { jwtValidator } from '../middleware/jwt-validator';

const router = Router()

router.get('/', getUsers)

router.get(
    '/:id',
    [
        check('id', 'id is missing').notEmpty(),
        //@ts-ignore
        check('id', `id not valid - user doesn't exist`).custom(validateId),
        fieldValidator,
        jwtValidator,
    ],
    getUser)

router.post(
    '/',
    [
        check('email', 'email is missing').notEmpty(),
        check('email', 'invalid email').isEmail(),
        check('email', 'email already in use').custom(dupEmail),
        check('first_name', 'name is missing').notEmpty(),
        check('first_name', 'first name should be longer than 2 characters and less than 60').isLength({ min: 2, max: 60 }),
        check('last_name', 'last name is missing').notEmpty(),
        check('last_name', 'last name should be longer than 2 characters and less than 60').isLength({ min: 2, max: 60 }),
        check('password', 'password is missing').notEmpty(),
        check('password', 'last name should be longer than 5 characters and less than 20').isLength({ min: 5, max: 20 }),
        fieldValidator,
    ],
    createUser)

router.put(
    '/:id',
    [
        check('id', 'id is missing').notEmpty(),
        //@ts-ignore
        check('id', `id not valid - user doesn't exist`).custom(validateId),
        fieldValidator,
        jwtValidator,
    ],
    updateUser)

router.delete(
    '/:id',
    [
        check('id', 'id is missing').notEmpty(),
        //@ts-ignore
        check('id', `id not valid - user doesn't exist`).custom(validateId),
        fieldValidator,
        jwtValidator,
    ],
    deleteUser)

export default router