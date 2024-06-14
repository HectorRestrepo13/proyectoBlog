import { comentarios } from "../models/tbl_Comentarios.js";


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
        res.status(500).send({
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
        res.status(500).send({
            status: false,
            descripcion: "Hubo un error en la API al Editar comentario",
            datos: null,
            error: error
        })
    }


}

// -- FIN FUNCION 

