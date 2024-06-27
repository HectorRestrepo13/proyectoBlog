import { func_InsertarEntrada, func_editarEntrada, func_EliminarEntrada, func_traerTodasLasEntradas, func_devolverImagen } from "../controllers/entrada.controller.js";
import { Router } from "express";

let entrada = Router();

entrada.post("/entradas/insertarEntrada/", func_InsertarEntrada);
entrada.put("/entradas/editarEntrada/", func_editarEntrada)
entrada.delete("/entradas/eliminarEntrada/:idEntrada", func_EliminarEntrada)
entrada.get("/entradas/traerTodasLasEntradas/", func_traerTodasLasEntradas)
entrada.get("/entradas/devolverImagen/", func_devolverImagen)
export default entrada;
