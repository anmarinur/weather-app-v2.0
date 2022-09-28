import { User } from "../models/user"
import { Request } from 'express';

import axios from 'axios';

export const cityExist = async (city: string, { req }: Request) => {

    const { data } = await axios.get(`https://restcountries.com/v3.1/name/${city}`)
          
    if(!data[0]?.name.common) {
        throw new Error(`The city: ${city} wasn't found`);
    }
    req!.cityName =  data[0].name.common

}

export const validateId = async (id: string, { req }: Request) => {

    const user = await User.findByPk(id)

    if (!user) {
        throw new Error(`The user with the id: ${id} doesn't exist on DB`);
    }
    req!.user = user
}

export const dupEmail = async (email: string) => {

    const user = await User.findAll({
        where: { email }
    })

    if(user.length !== 0){
        throw new Error(`The email: ${email} is already in use`);
    }
    
}