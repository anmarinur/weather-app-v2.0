import { Request, Response } from 'express';
import { City } from "../models/city";
import { User } from '../models/user';

export const newFavorite = async (req: Request, res: Response) => {

    const cityName = req.cityName

    try {

        const [user, dupCity] = await Promise.all([
            User.findByPk(req.params.id),
            City.findAll({ where: { city_name: cityName } }),
        ])

        if (dupCity.length > 0) {

            user?.addCities(dupCity)
            return res.json({
                ok: true,
                msg: 'new favorite',
                city: dupCity[0]
            });
        }

        else {
            const newCity = await City.create({ city_name: cityName })
            user?.addCity(newCity)

            return res.json({
                ok: true,
                msg: 'new favorite',
                city: newCity
            });
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Adding a new favorite failed',
        });
    }
};

export const removeFavorite = async (req: Request, res: Response) => {

    const cityName = req.cityName

    console.log(cityName);
    

    try {

        const [user, city] = await Promise.all([
            User.findByPk(req.params.id),
            City.findOne({ where: { city_name: cityName } }),
        ])        

        if (!user || !city) {
            return res.json({
                ok: true,
                msg: 'City no longer exist on DB'
            })
        }

        user?.removeCity(city)
        return res.json({
            ok: true,
            msg: 'favorite removed',
            city
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Removing a city favorite failed',
        });
    }
}