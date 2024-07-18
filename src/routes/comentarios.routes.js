import { Router } from "express";
import { func_insertarComentario, func_editarComentarios, func_selecionarComentarios } from "../controllers/comentarios.controller.js";

let rutaComentarios = Router();

rutaComentarios.post("/comentarios/insertarComentario/", func_insertarComentario);
rutaComentarios.put("/comentarios/editarComentario/", func_editarComentarios)
rutaComentarios.get("/comentarios/selecionarComentarios/:idEntrada", func_selecionarComentarios)

export default rutaComentarios;