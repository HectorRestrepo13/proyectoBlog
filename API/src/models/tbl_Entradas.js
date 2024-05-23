import { DataTypes } from "sequelize";
import sequelize from "./conexion.js";

export const entradas = sequelize.define('Entradas', {
    TituloEntrada: {
        type: DataTypes.STRING(75),
        allowNull: false
    },
    ContenidoEntrada: {
        type: DataTypes.TEXT('medium'),
        allowNull: false
    },
    FechaCreacion: {
        type: DataTypes.DATE,
        allowNull: false
    },

},
    {
        timestamps: false // Desactiva las columnas createdAt y updatedAt
    })
entradas.associate = (models) => {
    entradas.belongsTo(models.blog, {
        foreignKey: {
            allowNull: false,
        },
    });

    entradas.hasMany(models.comentarios, {});
    entradas.hasMany(models.imagenes, {});

    return entradas;
};