
import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'
dotenv.config()

const dbUser = process.env.DB_USER || ''
const dbPassword = process.env.DB_PASS || ''
const dbName = process.env.DB_NAME || ''
const dbHost = process.env.DB_HOST || ''

const sequelize = new Sequelize(dbName, dbUser, dbPassword,
    {
        host: dbHost,
        dialect: 'mysql',
    }
)

export default sequelize