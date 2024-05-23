import { Router } from "express";
import { func_registrarUsuario, pruebas, func_iniciarSesion, func_crearBlog } from "../controllers/usuarios.controller.js";

let rutaUsuario = Router();
rutaUsuario.post("/usuario/registrarUsuario/", func_registrarUsuario)
rutaUsuario.get("/usuario/iniciarSesion/", func_iniciarSesion)
rutaUsuario.post("/usuario/crearBlog/", func_crearBlog)
rutaUsuario.get("/usuario/pruebas/", pruebas)


export default rutaUsuario;