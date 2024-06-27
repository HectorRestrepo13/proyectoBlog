import { entradas } from "../models/tbl_Entradas.js";
import { blog } from "../models/tbl_blog.js";
import { usuario } from "../models/tbl_Usuarios.js";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Obtén la ruta del archivo actual y el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, '../../public/uploads/imagenesEntradas'); // aca meto la ruta del archivo
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


// FUNCION INSERTAR UNA ENTRADA EN EL BLOG

export const func_InsertarEntrada = async (req, res) => {

    const { TituloEntrada, ContenidoEntrada, FechaCreacion, BlogId } = req.query;

    try {

        // Aquí llamamos al middleware de Multer directamente
        upload.single('imagenEntrada')(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                res.status(200).send({
                    status: false,
                    descripcion: "No se pudo Insertar los datos Verificar LA parte del multer",
                    error: err
                })
            } else if (err) {
                res.status(200).send({
                    status: false,
                    descripcion: "No se pudo Insertar los datos Verificar LA parte del multer",
                    error: err
                })
            }

            // aca voy a verificar que sea imagen 
            let archivo = req.file.mimetype.split("/");
            let type = archivo[1];
            if (type.toUpperCase() == "JPEG" || type.toUpperCase() == "PNG") {


                const insertacion = await entradas.create({
                    TituloEntrada: TituloEntrada,
                    ContenidoEntrada: ContenidoEntrada,
                    ImagenEntrada: req.file.filename,
                    FechaCreacion: FechaCreacion,
                    BlogId: BlogId,

                });
                // Todo salió bien, enviamos la respuesta exitosa
                res.status(200).send({
                    status: true,
                    descripcion: "Entrada insertado con exito",
                    error: null
                })
            }
            else {

                fs.unlinkSync(req.file.path);
                console.log("Archivo eliminado correctamente");
                res.status(200).send({
                    status: false,
                    descripcion: "Solo se Aceptan Imagenes como PNG JPEG",
                    error: null
                })

            }
        })


    } catch (error) {
        res.status(200).send({
            status: false,
            descripcion: "Hubo un error en la API",
            error: error.message
        })
    }




}

// -- FIN FUNCION --

// FUNCION EDITAR LA ENTRADA 

export const func_editarEntrada = async (req, res) => {

    const { TituloEntrada, ContenidoEntrada, idEntrada } = req.query;

    try {
        let consultaEntrada = await entradas.findAll({
            where: {
                id: idEntrada,
            },
        });

        if (consultaEntrada != "") {
            // Aquí llamamos al middleware de Multer directamente
            upload.single('imagenEntrada')(req, res, async function (err) {
                if (err instanceof multer.MulterError) {
                    res.status(200).send({
                        status: false,
                        descripcion: "No se pudo Insertar los datos Verificar LA parte del multer",
                        error: err
                    })
                } else if (err) {
                    res.status(200).send({
                        status: false,
                        descripcion: "No se pudo Insertar los datos Verificar LA parte del multer",
                        error: err
                    })
                }

                // aca voy a verificar que sea imagen 
                let archivo = req.file.mimetype.split("/");
                let type = archivo[1];
                if (type.toUpperCase() == "JPEG" || type.toUpperCase() == "PNG") {


                    // Change everyone without a last name to "Doe"
                    await entradas.update(
                        {
                            TituloEntrada: TituloEntrada,
                            ContenidoEntrada: ContenidoEntrada,
                            ImagenEntrada: req.file.filename,

                        },
                        {
                            where: {
                                id: idEntrada,
                            },
                        },
                    );


                    // Todo salió bien, enviamos la respuesta exitosa
                    res.status(200).send({
                        status: true,
                        descripcion: "Entrada Actualizada con exito",
                        error: null
                    })
                }
                else {

                    fs.unlinkSync(req.file.path);
                    console.log("Archivo eliminado correctamente");
                    res.status(200).send({
                        status: false,
                        descripcion: "Solo se Aceptan Imagenes como PNG JPEG",
                        error: null
                    })

                }
            })
        }
        else {
            res.status(200).send({
                status: false,
                descripcion: "Ese ID de la Entrada no Existe",
                error: "null"
            })
        }




    } catch (error) {
        res.status(200).send({
            status: false,
            descripcion: "Hubo un error en la API",
            error: error.message
        })
    }



}

// -- FIN FUNCION -- 

// FUNCION PARA ELIMINAR ENTRADA 

export const func_EliminarEntrada = async (req, res) => {

    try {

        const idEntrada = req.params.idEntrada;
        await entradas.destroy({
            where: {
                id: idEntrada,
            },
        });

        res.status(200).send({
            status: true,
            descripcion: "Entrada Eliminada Con exito",
            error: null
        })

    } catch (error) {
        res.status(200).send({
            status: false,
            descripcion: "Hubo un error en la API",
            error: error.message
        })

    }



}

// -- FIN FUNCION --


// FUNCION PARA TRAER TODAS LAS ENTRADAS DEL BLOG

const checkFileExists = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.access(filePath, fs.constants.F_OK, (error) => {
            if (error) {
                reject(new Error(`No existe la imagen en la ruta: ${filePath}`));
            } else {
                resolve(filePath);
            }
        });
    });
};

export const func_traerTodasLasEntradas = async (req, res) => {
    try {
        // Traer los datos de la entrada
        let seleccionarEntradas = await entradas.findAll({
            include: [
                {
                    model: blog, // INNER JOIN con el modelo Blog
                    include: [
                        {
                            model: usuario // INNER JOIN con el modelo Usuario a través de Blog
                        }
                    ]
                }
            ],
            order: [
                ['id', 'DESC']
            ]
        });

        console.log("Voy a ver qué devuelve:");
        console.log(seleccionarEntradas);

        if (seleccionarEntradas.length > 0) {
            // Arreglo para almacenar las entradas con la URL de la imagen
            let arregloEntradas = [];

            for (const datosEntrada of seleccionarEntradas) {
                try {
                    console.log("ACA veo la imagen:");
                    console.log(datosEntrada.ImagenEntrada);

                    let ruta_apiImagenEntrada = path.resolve(__dirname, `../../public/uploads/imagenesEntradas/${datosEntrada.ImagenEntrada}`);
                    let ruta_apiImagenUsuario = path.resolve(__dirname, `../../public/uploads/perfilesUsuarios/${datosEntrada.blog.Usuario.ImagenUsuario}`);

                    console.log(`Ruta absoluta de la imagen de entrada: ${ruta_apiImagenEntrada}`);
                    console.log(`Ruta absoluta de la imagen de usuario: ${ruta_apiImagenUsuario}`);

                    // Verificar la existencia de ambas imágenes
                    try {
                        await checkFileExists(ruta_apiImagenEntrada);
                        var ImagenEntradaURL = `${req.protocol}://${req.get('host')}/uploads/imagenesEntradas/${datosEntrada.ImagenEntrada}`;
                    } catch (error) {
                        console.log("No se encontró la imagen de entrada:", error.message);
                        var ImagenEntradaURL = null;
                    }

                    try {
                        await checkFileExists(ruta_apiImagenUsuario);
                        var ImagenUsuarioURL = `${req.protocol}://${req.get('host')}/uploads/perfilesUsuarios/${datosEntrada.blog.Usuario.ImagenUsuario}`;
                    } catch (error) {
                        console.log("No se encontró la imagen de usuario:", error.message);
                        var ImagenUsuarioURL = null;
                    }

                    // Crear el objeto de entrada
                    let objetoEntrada = {
                        id: datosEntrada.id,
                        TituloEntrada: datosEntrada.TituloEntrada,
                        ContenidoEntrada: datosEntrada.ContenidoEntrada,
                        FechaCreacion: datosEntrada.FechaCreacion,
                        UrlImagenEntrada: ImagenEntradaURL,
                        UrlImagenUsuario: ImagenUsuarioURL,
                        TituloBlog: datosEntrada.blog.TituloBlog,
                        DescripcionBlog: datosEntrada.blog.DescripcionBlog,
                        UsuarioCedulaUsuario: datosEntrada.blog.UsuarioCedulaUsuario,
                        NombreUsuario: datosEntrada.blog.Usuario.NombreUsuario,
                        ApellidoUsuario: datosEntrada.blog.Usuario.ApellidoUsuario,
                        CorreoUsuario: datosEntrada.blog.Usuario.CorreoUsuario,
                    };

                    arregloEntradas.push(objetoEntrada);
                } catch (error) {
                    console.log("Error procesando la entrada:", error.message);
                }
            }

            res.status(200).send({
                status: true,
                descripcion: arregloEntradas,
                error: null
            });
        } else {
            res.status(200).send({
                status: false,
                descripcion: "No tiene Entradas este blog",
                error: null
            });
        }
    } catch (error) {
        res.status(500).send({
            status: false,
            descripcion: "Hubo un error en la API",
            error: error.message
        });
    }
};

// -- FIN FUNCION --


// FUNCION PARA DEVOLVER LA IMAGEN DE LA ENTRADA (esta funcion es sola para hacer la prueba)
export const func_devolverImagen = async (req, res) => {
    try {
        //  convierto la ruta Relativa a ruta Absoluta 
        let ruta_api = path.resolve(__dirname, "../../public/uploads/imagenesEntradas/pe-1716520292048-usuario.jpg");

        fs.access(ruta_api, fs.constants.F_OK, (error) => {
            if (!error) {
                //res.sendFile(ruta_api);
                const ImagenEntradaURL = `${req.protocol}://${req.get('host')}/uploads/imagenesEntradas/pe-1716520292048-usuario.jpg`;

                res.send({
                    URL: ImagenEntradaURL
                })

            } else {
                res.status(404).send({
                    status: "error",
                    mensaje: "no existe la imagen",
                });
            }
        });
    } catch (error) {
        console.log("Hubo un error al devolver la imagen");

        res.status(500).send({
            status: false,
            descripcion: "Hubo un error en la API",
            error: error.message
        });
    }
};


// -- FIN FUNCION --