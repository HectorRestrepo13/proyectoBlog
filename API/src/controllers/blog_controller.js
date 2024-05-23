
import { blog } from '../models/tbl_blog.js';


export const listartodas = async (req, res) => {
    let respustaBlog = await blog.findAll();
    res.send({ status: "ok", respuesta: respustaBlog });
};

