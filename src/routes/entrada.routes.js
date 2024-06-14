import { func_InsertarEntrada, func_editarEntrada, func_EliminarEntrada } from "../controllers/entrada.controller.js";
import { Router } from "express";

let entrada = Router();

entrada.post("/entradas/insertarEntrada/", func_InsertarEntrada);
entrada.put("/entradas/editarEntrada/", func_editarEntrada)
entrada.delete("/entradas/eliminarEntrada/:idEntrada", func_EliminarEntrada)
export default entrada;
