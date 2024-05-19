import { DataTypes } from 'sequelize';
import sequelize from '../db/config';

export const favoriteCities = sequelize.define('favorites', {

    city_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    city: {
        type: DataTypes.CHAR(60),
        allowNull: false
    }

})