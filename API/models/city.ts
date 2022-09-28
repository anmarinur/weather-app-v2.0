import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../db/config";
import { User } from "./user";

export class City extends Model<InferAttributes<City>, InferCreationAttributes<City>> {

    declare city_id:CreationOptional<number>;
    declare ownerId?: ForeignKey<User['user_id']>;
    declare city_name: string;
}

City.init({
    city_id: {
        type: DataTypes.TINYINT,
        primaryKey: true,
        autoIncrement: true
    },
    city_name: {
        type: DataTypes.CHAR(60),
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'city',
    timestamps: false
})