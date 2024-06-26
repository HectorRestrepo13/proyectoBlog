import { entradas } from "../models/tbl_Entradas.js";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Obtén la ruta del archivo actual y el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, '../models/uploads/imagenesEntradas'); // aca meto la ruta del archivo
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

export const func_traerTodasLasEntradas = async (req, res) => {

    try {

        let selecionarEntradas = await entradas.findAll({
            order: [
                ['id', 'DESC']
            ]
        })
        console.log("voy  aver que devuelve");
        console.log(selecionarEntradas)
        if (selecionarEntradas.length > 0) {
            res.status(200).send({
                status: true,
                descripcion: selecionarEntradas,
                error: null
            })

        }
        else {
            res.status(200).send({
                status: false,
                descripcion: "No tiene Entradas este blog",
                error: null

            })
        }


    } catch (error) {
        res.status(500).send({
            status: false,
            descripcion: "Hubo un error en la API",
            error: error.message
        })
    }

}

// -- FIN FUNCION --