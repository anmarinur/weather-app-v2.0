import dotenv from 'dotenv'
dotenv.config()

import express, { Application } from 'express'
import cors from 'cors'
import path from 'path'
import './user'
import './city'
import { User } from './user'
import { City } from './city'

import sequelize from '../db/config'
import userRoutes from '../routes/user'
import favoriteRoutes from '../routes/city'
import authRoutes from '../routes/auth'

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        users: '/api/users',
        favorite: '/api/favorite',
        auth: '/api/auth',
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000'

        //initial methods
        this.dbConnection()
        this.middlewares()
        this.routes()

    }

    routes() {
        this.app.use(this.apiPaths.users, userRoutes)
        this.app.use(this.apiPaths.favorite, favoriteRoutes)
        this.app.use(this.apiPaths.auth, authRoutes)

        this.app.use('*', (req, res) => {
            res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
        })

    }

    middlewares() {
        this.app.use(cors())

        this.app.use(express.json())

        this.app.use(express.static('public'))

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`)
        })
    }

    async dbConnection() {
        try {

            User.belongsToMany(City, {
                through: 'user_favorites',
                foreignKey: {name: 'user_id'}
            })

            City.belongsToMany(User, {
                through: 'user_favorites',
                foreignKey: {name: 'city_id'}
            })

            await sequelize.sync({alter: true})
            console.log('database online')

        } catch (error) {
            console.log(error)

        }
    }
}

export default Server