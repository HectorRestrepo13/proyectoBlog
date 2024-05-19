
import express from 'express'
import sequelize from "./src/models/conexion";

let app = express();
app.use(express.json());



const puerto = 3100;


app.server = app.listen(puerto, () => {
    console.log(`Server ejecutandose en ${puerto}...`);
});

sequelize
    .sync({ force: false })
    .then(() => {
        console.log("sincronizacion ok!");
    })
    .catch((error) => {
        console.log(`error en la sincronizacion`);
    });


