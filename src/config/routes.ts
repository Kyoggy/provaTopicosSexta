import { Router } from "express";
import { FolhaController } from "../controller/folha";

const router : Router = Router();

//Configurar todas rotas/URLs/endpoints da aplicação
router.post("/", new FolhaController().cadastrarFolha);
router.get("/", new FolhaController().listarFolha);
router.get("/:cpf", new FolhaController().buscarFolha);

export { router };