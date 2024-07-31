import { Router } from "express";
import { func_insertarComentario, func_editarComentarios, func_selecionarComentarios, func_eliminarComentario } from "../controllers/comentarios.controller.js";

let rutaComentarios = Router();

rutaComentarios.post("/comentarios/insertarComentario/", func_insertarComentario);
rutaComentarios.put("/comentarios/editarComentario/", func_editarComentarios)
rutaComentarios.get("/comentarios/selecionarComentarios/:idEntrada", func_selecionarComentarios)
rutaComentarios.delete("/comentarios/eliminarComentario/:idCometario", func_eliminarComentario)

export default rutaComentarios;