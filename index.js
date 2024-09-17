
import express from 'express'
import path from 'path'
import sequelize from "./src/models/conexion.js";
import rutaBlog from './src/routes/blog.routes.js';
import rutaUsuario from './src/routes/usuario.routes.js';
import entrada from './src/routes/entrada.routes.js';
import rutaComentarios from './src/routes/comentarios.routes.js';
import cors from 'cors'
let app = express();
app.use(cors())


// Configurar CORS para permitir solicitudes desde múltiples orígenes
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];
app.use(cors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
}));

import dotenv from 'dotenv'; // llamo la libreria 
dotenv.config();

app.use(express.json());
app.use(rutaBlog);
app.use(rutaUsuario);
app.use(entrada);
app.use(rutaComentarios);
const puerto = process.env.PORT || 3000;


import { fileURLToPath } from 'url';


// En Node.js, cuando se utiliza CommonJS (CJS), __dirname y _
// _filename están disponibles por defecto y representan el directorio actual y
//  la ruta del archivo actual, respectivamente. Sin embargo, cuando se utiliza ECMAScript
//   Modules (ESM) especificando "type": "module" en el archivo package.json, estas variables 
//   no están disponibles. Para obtener el mismo resultado, necesitas usar la API de import.meta.url.

// Obtener la ruta del archivo actual y el directorio actual
const __filename = fileURLToPath(import.meta.url);  // import.meta.url: Proporciona la URL del módulo actual.
const __dirname = path.dirname(__filename);

// Servir archivos estáticos desde la carpeta "public/uploads"
app.use('/uploads', express.static(path.join(__dirname, './public/uploads')));

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


