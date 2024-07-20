import { Router } from "express";
import conn from "../config/conn.js";

import { atualizarCliente, criarCliente, getClientes, unicoCliente } from "../controllers/clientesController.js";


const router = Router();

router.get("/", getClientes);
router.post("/criar", criarCliente);
router.put("/atualizar/:id", atualizarCliente);
router.get("/:id", unicoCliente);



export default router;