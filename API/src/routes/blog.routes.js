import { Router } from "express";
import { listartodas } from "../controllers/blog_controller.js";

let rutaBlog = Router();
rutaBlog.get("/blog/selecionarTodo/", listartodas);

export default rutaBlog;