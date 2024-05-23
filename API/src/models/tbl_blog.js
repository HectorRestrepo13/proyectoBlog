import { DataTypes } from "sequelize";

import sequelize from "./conexion.js";

export const blog = sequelize.define('Blog', {
    TituloBlog: {
        type: DataTypes.STRING(75),
        allowNull: false
    },
    DescripcionBlog: {
        type: DataTypes.STRING,
        allowNull: false
    },


}, {
    timestamps: false // Desactiva las columnas createdAt y updatedAt
}
)
blog.associate = (models) => {
    blog.hasMany(models.entradas, {});

    blog.belongsTo(models.usuario, {
        foreignKey: {
            allowNull: false,
        },
    });


    return blog;
};