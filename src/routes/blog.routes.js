import { Router } from "express";
import { func_crearBlog } from "../controllers/blog_controller.js";

let rutaBlog = Router();
rutaBlog.post("/blog/crearBlog/", func_crearBlog)


export default rutaBlog;