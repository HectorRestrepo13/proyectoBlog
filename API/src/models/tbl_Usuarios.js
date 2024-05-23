import { DataTypes } from "sequelize";
import sequelize from "./conexion.js";


export const usuario = sequelize.define('Usuarios', {
    CedulaUsuario: {
        primaryKey: true, // Define la CedulaUsuario como la clave primaria
        type: DataTypes.BIGINT,
        allowNull: false
    },
    NombreUsuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ApellidoUsuario: {
        type: DataTypes.STRING,
        allowNull: true
    },
    TelefonoUsurio: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    CorreoUsuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    PasswordUsuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ImagenUsuario: {
        type: DataTypes.STRING,
        allowNull: false
    },

},
    {
        timestamps: false // Desactiva las columnas createdAt y updatedAt
    })

usuario.associate = (models) => {
    usuario.hasMany(models.blog, {});
    usuario.hasMany(models.comentarios, {});

    return usuario;
};
