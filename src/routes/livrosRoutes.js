import { Router } from "express";
import conn from "../config/conn.js";

import { getLivros, cadastrarLivro, excluirLivro, unicoLivro, atualizarUsuario } from "../controllers/livrosController.js";


const router = Router();

router.get("/", getLivros);
router.post("/criar", cadastrarLivro);
router.delete("/excluir/:id", excluirLivro);
router.put("/atualizar/:id", atualizarUsuario);
router.get("/:id", unicoLivro);



export default router;
