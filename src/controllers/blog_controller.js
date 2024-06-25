
import { blog } from '../models/tbl_blog.js';


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
        res.status(200).send({
            status: false,
            descripcion: "Hubo un error en la API",
            error: error.message
        })
    }


}

// -- FIN FUNCION --


