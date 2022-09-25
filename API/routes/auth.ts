import { Router } from "express"
import { check } from "express-validator"
import { login, renewToken } from "../controllers/auth"
import { credentialsValidator } from "../helpers/credentials-validator"
import { fieldValidator } from "../middleware/field-validator"
import { jwtValidator } from "../middleware/jwt-validator"

const router = Router()

router.post(
   '/',
   [
      check('password', 'Password is missing').notEmpty(),
      check('email', 'email is missing').notEmpty(),
      fieldValidator,
      credentialsValidator,
   ],
   login
)

router.get(
   '/',
   [
      check('name', 'name is missing').notEmpty(),
      check('id', 'id is missing').notEmpty(),
      jwtValidator,
   ],
   renewToken
)

export default router