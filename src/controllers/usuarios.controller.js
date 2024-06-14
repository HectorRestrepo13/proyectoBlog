import { usuario } from "../models/tbl_Usuarios.js";
import bcrypt from "bcrypt";
import { blog } from "../models/tbl_blog.js";

import fs from 'fs'; // para manejar archivos locales
import path from "path"; // investigar
import multer from "multer"; // para subir archivos
import { fileURLToPath } from "url";

// Obtén la ruta del archivo actual y el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, '../models/uploads/perfilesUsuarios'); // aca meto la ruta del archivo
if (!fs.existsSync(uploadDir)) { // verifico si existe
    fs.mkdirSync(uploadDir, { recursive: true }); // si no existe lo creo 
}


// configuracion del middleware para subir archivos al server
const almacenamiento = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // aca coloco la ruta donde se va enviar los archivos
    },
    filename: (req, file, cb) => {
        cb(null, "pe-" + Date.now() + "-" + file.originalname); // aca coloco como quiero que se guarde el archivo
    },
});
const upload = multer({ storage: almacenamiento });

//==================================================================






// FUNCION PARA REGISTRAR USUARIO CON IMAGENES

export const func_registrarUsuario = async (req, res) => {

    const { cedulaUsuario, nombreUsuario, apellidoUsuario, telefonoUsuario, correoUsuario, paswordUsuario, } = req.query;

    // funcion para saber si el usuario ya esta registrado
    const usuarioExiste = await usuario.findOne({ where: { CedulaUsuario: cedulaUsuario } });
    if (usuarioExiste === null) {


        const salRondas = 10;
        const contraIncriptada = `s0/\/${paswordUsuario}\P4$$w0rD`;

        //  PARA INCRITAR LA CONTRASEÑA UTILIZANDO BCRYPT
        bcrypt.hash(contraIncriptada, salRondas, async function (err, hash) {
            if (!err) {

                try {


                    // Aquí llamamos al middleware de Multer directamente
                    upload.single('foto')(req, res, async function (err) {
                        if (err instanceof multer.MulterError) {
                            res.status(500).send({
                                status: false,
                                descripcion: "No se pudo Insertar los datos Verificar LA parte del multer",
                                error: err
                            })
                        } else if (err) {
                            res.status(500).send({
                                status: false,
                                descripcion: "No se pudo Insertar los datos Verificar LA parte del multer",
                                error: err
                            })
                        }
                        console.log("ACA voy a mirar el Archivo :" + req.file);
                        // aca voy a verificar que sea imagen 
                        let archivo = req.file.mimetype.split("/");
                        let type = archivo[1];
                        if (type.toUpperCase() == "JPEG" || type.toUpperCase() == "PNG") {


                            const insertacion = await usuario.create({
                                CedulaUsuario: cedulaUsuario,
                                NombreUsuario: nombreUsuario,
                                ApellidoUsuario: apellidoUsuario,
                                TelefonoUsurio: telefonoUsuario,
                                CorreoUsuario: correoUsuario,
                                PasswordUsuario: hash,
                                ImagenUsuario: req.file.filename
                            });
                            // Todo salió bien, enviamos la respuesta exitosa
                            res.status(200).send({
                                status: true,
                                descripcion: "Usuario insertado con exito",
                                error: null
                            })
                        }
                        else {

                            fs.unlinkSync(req.file.path);
                            console.log("Archivo eliminado correctamente");
                            res.status(404).send({
                                status: false,
                                descripcion: "Solo se Aceptan Imagenes como PNG JPEG",
                                error: null
                            })

                        }
                    })


                } catch (error) {
                    res.status(404).send({
                        status: false,
                        descripcion: "No se pudo Insertar los datos",
                        error: error
                    })
                }


            }
            else {
                res.status(404).send({
                    status: false,
                    descripcion: "Hubo un error al Incriptar la Contraseña",
                    error: err
                })
            }


        });
        //  FIN INCRITACION 

    } else {

        res.status(404).send({
            status: false,
            descripcion: "Usuario ya esta Registrado",
            error: null
        })

    }


}

// -- FIN FUNCION --



// funcion pruebas 
export const pruebas = async (req, res) => {

    try {


        let consultaEntrada = await blog.findAll({
            where: {
                id: 2,
            },
        });
        res.send(consultaEntrada)

    } catch (error) {
        res.send(error)
    }


};
// fin pruebas 


// FUNCION INICIAR SESION
export const func_iniciarSesion = async (req, res) => {
    const { correo, contra } = req.query;

    try {
        // Buscar usuario por correo
        const verificacionCorreo = await usuario.findOne({
            where: {
                CorreoUsuario: correo,
            },
        });

        if (verificacionCorreo) {
            const contraBaseDatos = verificacionCorreo.PasswordUsuario;

            // Verificar la contraseña
            if (bcrypt.compareSync(contra, contraBaseDatos)) {
                // Verificar si el usuario ya creó un blog
                const ConsultarBlog = await blog.findOne({
                    where: {
                        UsuarioCedulaUsuario: verificacionCorreo.CedulaUsuario,
                    },
                });

                if (ConsultarBlog) {
                    res.status(200).send({
                        status: true,
                        descripcion: verificacionCorreo,
                        error: null,
                        blogs: true,
                    });
                } else {
                    res.status(200).send({
                        status: true,
                        descripcion: verificacionCorreo,
                        error: null,
                        blogs: false,
                    });
                }
            } else {
                res.status(404).send({
                    status: false,
                    descripcion: "Contraseña Incorrecta",
                    error: null,
                    blogs: false,
                });
            }
        } else {
            res.status(404).send({
                status: false,
                descripcion: "Usuario no Registrado",
                error: null,
                blogs: false,
            });
        }
    } catch (error) {
        res.status(500).send({
            status: false,
            descripcion: "Hubo un error en la API",
            error: error.message,
            blogs: false,
        });
    }
};
// -- FIN FUNCION --