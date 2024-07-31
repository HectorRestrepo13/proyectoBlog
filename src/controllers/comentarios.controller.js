import { comentarios } from "../models/tbl_Comentarios.js";
import { usuario } from "../models/tbl_Usuarios.js";
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from "url";

// Obtén la ruta del archivo actual y el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// FUNCION PARA INSERTAR NUEVO COMENTARIO 

export const func_insertarComentario = async (req, res) => {
    try {
        const { DescripcionComentario, FechaComentario, UsuarioCedulaUsuario, EntradaId } = req.body;

        const insertarComentario = await comentarios.create({
            DescripcionComentario: DescripcionComentario,
            FechaComentario: FechaComentario,
            like: 0,
            UsuarioCedulaUsuario: UsuarioCedulaUsuario,
            EntradaId: EntradaId,

        });


        res.status(200).send({
            status: true,
            descripcion: "Comentario Insertado con Exito",
            datos: insertarComentario,
            error: null
        })


    } catch (error) {
        res.status(200).send({
            status: false,
            descripcion: "Hubo un error en la API al Insertar comentari",
            datos: null,
            error: error
        })
    }



}

// -- FIN FUNCION --

// FUNCION PARA EDITAR COMENTARIO

export const func_editarComentarios = async (req, res) => {

    try {


        const { DescripcionComentario, UsuarioCedulaUsuario, idComentario } = req.body;

        const consultaEditar = await comentarios.update(
            { DescripcionComentario: DescripcionComentario },
            {
                where: {
                    UsuarioCedulaUsuario: UsuarioCedulaUsuario,
                    id: idComentario
                },
            },
        );



        res.status(200).send({
            status: true,
            descripcion: "Comentario Editado Con exito",
            datos: consultaEditar,
            error: null
        })




    } catch (error) {
        res.status(200).send({
            status: false,
            descripcion: "Hubo un error en la API al Editar comentario",
            datos: null,
            error: error
        })
    }


}

// -- FIN FUNCION

// FUNCION PARA SELECIONAR LOS COMENTARIOS ESPECIFICOS DE ESA ENTRADA

export const func_selecionarComentarios = async (req, res) => {

    try {

        let idEntrada = req.params.idEntrada;

        const todosLosComentarios = await comentarios.findAll({
            where: {
                EntradaId: idEntrada,
            },
            include: [
                {
                    model: usuario,
                    required: true, // Esto realiza un INNER JOIN
                }
            ]
        });


        // obtengo la ruta Absoluta de la imagen 
        let rutaImagenUsuario = path.resolve(__dirname, `../../public/uploads/perfilesUsuarios/${todosLosComentarios[0].Usuario.ImagenUsuario}`)
        console.log(" la ruta absoluta " + rutaImagenUsuario)
        var urlImagenUsuario = null;
        // compruebo de que la imagen exista en esa ruta 
        // creo una promesa para poder verificar ya que el "fs.access" es asincronico
        let verificacionEXistencia = new Promise((resolve, reject) => {
            fs.access(rutaImagenUsuario, fs.constants.F_OK, (error) => {
                if (error) {
                    reject(false);
                } else {
                    resolve(true);
                }
            });
        })

        if (verificacionEXistencia) {
            urlImagenUsuario = `${req.protocol}://${req.get('host')}/uploads/perfilesUsuarios/${todosLosComentarios[0].Usuario.ImagenUsuario}`;

        }

        res.status(200).send(
            {
                status: true,
                descripcion: "Selecionada todas las entradas con exito!!",
                datos: todosLosComentarios,
                urlImagenUsuario: urlImagenUsuario,
                error: null
            }
        )


    } catch (error) {
        res.status(200).send(
            {
                status: false,
                descripcion: "Hubo un error en la API al Selecionar los comentarios",
                datos: null,
                urlImagenUsuario: null,
                error: error
            }
        )
    }


}

// -- FIN FUNCION --


// FUNCION PARA ELIMINAR COMENTARIO

export const func_eliminarComentario = async (req, res) => {
    try {

        let idComentario = req.params.idCometario;

        const resultado = await comentarios.destroy({
            where: {
                id: idComentario
            }
        });

        if (resultado > 0) {
            res.status(200).send(
                {
                    status: true,
                    descripcion: "Comentario Eliminado Con exito",
                    datos: resultado,
                    error: null
                }
            )
        }
        else {
            res.status(200).send(
                {
                    status: false,
                    descripcion: "Comentario no Encontrado",
                    datos: resultado,
                    error: null
                }
            )
        }






    } catch (error) {
        res.status(200).send(
            {
                status: false,
                descripcion: "Hubo un error en la API al Eliminar el comentario",
                datos: null,
                error: error
            }
        )
    }
}

// -- FIN FUNCION --