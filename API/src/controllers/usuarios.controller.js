import { usuario } from "../models/tbl_Usuarios.js";
import bcrypt from "bcrypt";
import { blog } from "../models/tbl_blog.js";

import fs from 'fs'; // para manejar archivos locales
import path from "path"; // investigar
import multer from "multer"; // para subir archivos



// configuracion del middleware para subir archivos al server
const almacenamiento = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../models/uploads/perfilesUsuarios"); // aca coloco la ruta donde se va enviar los archivos
    },
    filename: (req, file, cb) => {
        cb(null, "pe-" + Date.now() + "-" + file.originalname); // aca coloco como quiero que se guarde el archivo
    },
});
const upload = multer({ storage: almacenamiento });

//==================================================================






// FUNCION PARA REGISTRAR USUARIO

export const func_registrarUsuario = async (req, res) => {

    const { cedulaUsuario, nombreUsuario, apellidoUsuario, telefonoUsuario, correoUsuario, paswordUsuario, imagenUsuario, } = req.body;

    // funcion para saber si el usuario ya esta registrado
    const usuarioExiste = await usuario.findOne({ where: { CedulaUsuario: cedulaUsuario } });
    if (usuarioExiste === null) {

        const salRondas = 10;
        const contraIncriptada = `s0/\/${paswordUsuario}\P4$$w0rD`;

        //  PARA INCRITAR LA CONTRASEÑA UTILIZANDO BCRYPT
        bcrypt.hash(contraIncriptada, salRondas, async function (err, hash) {
            if (!err) {

                try {
                    const insertacion = await usuario.create({
                        CedulaUsuario: cedulaUsuario,
                        NombreUsuario: nombreUsuario,
                        ApellidoUsuario: apellidoUsuario,
                        TelefonoUsurio: telefonoUsuario,
                        CorreoUsuario: correoUsuario,
                        PasswordUsuario: hash,
                        ImagenUsuario: imagenUsuario
                    });


                    res.status(200).send({
                        status: true,
                        descripcion: "Usuario insertado con exito",
                        error: null
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


    // funcion para saber si el usuario ya esta registrado
    const usuarioExiste = await usuario.findOne({ where: { CedulaUsuario: 1006322 } });
    if (project === null) {
        console.log('Not found!');
        res.status(404).send("no da")
    } else {

        res.status(200).send("entro")

    }

}
// fin pruebas 


// FUNCION INICIAR SESION

export const func_iniciarSesion = async (req, res) => {

    let correo = req.query.correo;
    let contra = req.query.contra;
    try {
        // aca voy a traer los datos del Usuario con el correo si devuelve null es porque no esta registrado
        const verificacionCorreo = await usuario.findAll({
            where: {
                CorreoUsuario: correo,
            },
        });

        if (verificacionCorreo.length > 0) {

            let contraBaseDatos = verificacionCorreo[0].PasswordUsuario

            if (bcrypt.compareSync(`s0/\/${contra}\P4$$w0rD`, contraBaseDatos)) {


                // aca voy a verificar si el Usuario ya creo un Blog o es Primera vez

                const ConsultarBlog = await usuario.findAll({
                    where: {
                        CedulaUsuario: verificacionCorreo[0].CedulaUsuario,
                    },
                    include: [{
                        model: blog,
                        required: true,  // Esto asegura que se utilice INNER JOIN
                    }]
                });

                if (ConsultarBlog.length > 0) {
                    res.status(200).send({
                        status: true,
                        descripcion: ConsultarBlog,
                        error: null,
                        blogs: true
                    })
                }
                else {
                    res.status(200).send({
                        status: true,
                        descripcion: verificacionCorreo,
                        error: null,
                        blogs: false
                    })

                }

            }
            else {
                res.status(404).send({
                    status: false,
                    descripcion: "Contraseña Incorrecta",
                    error: null,
                    blogs: false
                })
            }




        }
        else {
            res.status(404).send({
                status: false,
                descripcion: "Usuario no Registrado",
                error: null,
                blogs: false
            })
        }


    } catch (error) {
        res.status(404).send({
            status: false,
            descripcion: "Hubo un error en la API",
            error: error.message,
            blogs: false
        })
    }

}


// -- FIN FUNCION --

// FUNCION PARA CREAR EL BLOG

export const func_crearBlog = async (req, res) => {

    const { TituloBlog, DescripcionBlog, UsuarioCedulaUsuario } = req.body;
    try {
        const InsertarBlog = await blog.create({
            TituloBlog: TituloBlog,
            DescripcionBlog: DescripcionBlog,
            UsuarioCedulaUsuario: UsuarioCedulaUsuario
        });
        res.status(200).send({
            status: true,
            descripcion: InsertarBlog,
            error: null
        })


    } catch (error) {
        res.status(404).send({
            status: false,
            descripcion: "Hubo un error en la API",
            error: error.message
        })
    }


}

// -- FIN FUNCION --