import { Sequelize } from "sequelize";


// instanciar la clase sequelize y le pasamos 
const sequelize = new Sequelize('sequelize', 'root', '', {
    host: 'localhost',
    dialect: 'mysql' // ojo el dialecto define el gestor de base de datos , recordar descargar el driver "npm i mysql2"
})

sequelize.authenticate().then(() => {
    console.log('conexion exitosa')
}).catch(error => {
    console.log("error en la conexion", error)

})

export default sequelize;