import { CreationOptional, DataTypes, ForeignKey, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, HasManySetAssociationsMixin, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from '../db/config';
import { City } from './city';

interface Cities {
    city_id: number,
    city_name: string
}

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {

    declare user_id: CreationOptional<number>;
    declare first_name: string;
    declare last_name: string;
    declare email: string;
    declare password: string;
    declare status: CreationOptional<boolean>;
    declare Cities?: CreationOptional<Cities[]>;

    declare getCity: HasManyGetAssociationsMixin<City>; // Note the null assertions!
    declare addCity: HasManyAddAssociationMixin<City, number>;
    declare addCities: HasManyAddAssociationsMixin<City, number>;
    declare setCity: HasManySetAssociationsMixin<City, number>;
    declare removeCity: HasManyRemoveAssociationMixin<City, number | null>;
    declare removeCities: HasManyRemoveAssociationsMixin<City, number>;
    declare hasCity: HasManyHasAssociationMixin<City, number>;
    declare hasCities: HasManyHasAssociationsMixin<City, number>;
    declare countCity: HasManyCountAssociationsMixin;
    declare createCity: HasManyCreateAssociationMixin<City, 'city_id'>;

}

User.init ({
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: DataTypes.CHAR(60),
        allowNull: false
    },
    last_name: {
        type: DataTypes.CHAR(60),
        allowNull: false
    },
    email: {
        type: DataTypes.CHAR(60),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.CHAR(60),
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
} , {
    sequelize,
    tableName: 'users'
}) 