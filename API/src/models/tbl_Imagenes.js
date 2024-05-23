import { DataTypes } from "sequelize";
import sequelize from "./conexion.js";


export const imagenes = sequelize.define('Imagenes', {
    DescripcionImagen: {
        type: DataTypes.STRING,
        allowNull: true
    },


},
    {
        timestamps: false // Desactiva las columnas createdAt y updatedAt
    })

imagenes.associate = (models) => {
    imagenes.belongsTo(models.entradas, {
        foreignKey: {
            allowNull: false,
        },
    });
    return imagenes;
};