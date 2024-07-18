import { DataTypes } from "sequelize";
import sequelize from "./conexion.js";



export const comentarios = sequelize.define('comentarios', {
    DescripcionComentario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    FechaComentario: {
        type: DataTypes.DATE,
        allowNull: false
    },
    like: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
},
    {
        timestamps: false // Desactiva las columnas createdAt y updatedAt
    })

comentarios.associate = (models) => {
    comentarios.belongsTo(models.usuario, {
        foreignKey: {
            allowNull: false,
        },
    });
    comentarios.belongsTo(models.entradas, {
        foreignKey: {
            allowNull: false,
        },
    });

    return comentarios;
};

