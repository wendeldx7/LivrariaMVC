import { Router } from "express";
import conn from "../config/conn.js";

import { atualizarFuncionario, criarFuncionario, excluirFuncionario, getFuncionario, unicoFuncionario } from "../controllers/funcionarioController.js";


const router = Router();

router.get("/", getFuncionario);
router.post("/criar", criarFuncionario);
router.delete("/excluir/:id", excluirFuncionario);
router.put("/atualizar/:id", atualizarFuncionario);
router.get("/:id", unicoFuncionario);



export default router;