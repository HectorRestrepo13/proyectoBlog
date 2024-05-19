import { DataTypes } from "sequelize";

import sequelize from "./conexion";

export const Empleado = sequelize.define('Blog', {
    tituloBlog: {
        type: DataTypes.STRING,
        allowNull: false
    },
    urlBlog: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nombreVicible: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

})