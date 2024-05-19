import { DataTypes } from "sequelize";

import sequelize from "./conexion";

export const Empleado = sequelize.define('empleado', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellidos: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fechaNace: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    nivel: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
})