
import express from 'express'
import sequelize from "./src/models/conexion.js";
import rutaBlog from './src/routes/blog.routes.js';
import rutaUsuario from './src/routes/usuario.routes.js';
import entrada from './src/routes/entrada.routes.js';
import rutaComentarios from './src/routes/comentarios.routes.js';
let app = express();
app.use(express.json());
app.use(rutaBlog);
app.use(rutaUsuario);
app.use(entrada);
app.use(rutaComentarios);
const puerto = 3100;



// Asociaciones ENTRE LAS TABLAS
import { blog } from './src/models/tbl_blog.js';
import { comentarios } from './src/models/tbl_Comentarios.js';
import { entradas } from './src/models/tbl_Entradas.js';
import { imagenes } from './src/models/tbl_Imagenes.js';
import { usuario } from './src/models/tbl_Usuarios.js';
// Objeto de modelos
const models = { blog, comentarios, entradas, imagenes, usuario };

// Establecer asociaciones
Object.keys(models).forEach(modelName => {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models);
    }
});
// -- FIN --

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


