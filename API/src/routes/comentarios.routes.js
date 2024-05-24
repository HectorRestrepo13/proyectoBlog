import { Router } from "express";
import { func_insertarComentario, func_editarComentarios } from "../controllers/comentarios.controller.js";

let rutaComentarios = Router();

rutaComentarios.post("/comentarios/insertarComentario/", func_insertarComentario);
rutaComentarios.put("/comentarios/editarComentario/", func_editarComentarios)


export default rutaComentarios;