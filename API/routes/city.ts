import { Router } from 'express';
import { check } from 'express-validator';

import { fieldValidator } from '../middleware/field-validator';

import { newFavorite, removeFavorite } from '../controllers/cities';
import { cityExist, validateId } from '../helpers/db-validators';
import { jwtValidator } from '../middleware/jwt-validator';

const router = Router()

router.post(
    '/:id',
    [
        check('id', 'id is missing').notEmpty(),
        //@ts-ignore
        check('id').custom(validateId),
        check('city_name', 'The city name is missing').notEmpty(),
        //@ts-ignore
        check('city_name', 'The city name is missing').custom(cityExist),
        fieldValidator,
        jwtValidator
    ],
    newFavorite)

router.delete(
    '/:id',
    [
        check('city_name', 'The city name is missing').notEmpty(),
        //@ts-ignore
        check('city_name', 'The city name is missing').custom(cityExist),
        fieldValidator,
        jwtValidator
    ],
    removeFavorite
)

export default router