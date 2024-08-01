import { Router } from "express";
import { func_registrarUsuario, pruebas, func_iniciarSesion, func_editarPerfil } from "../controllers/usuarios.controller.js";

let rutaUsuario = Router();
rutaUsuario.post("/usuario/registrarUsuario/", func_registrarUsuario)
rutaUsuario.get("/usuario/iniciarSesion/", func_iniciarSesion)
rutaUsuario.get("/usuario/pruebas/", pruebas)
rutaUsuario.put("/usuario/editarPerfil/", func_editarPerfil)



export default rutaUsuario;