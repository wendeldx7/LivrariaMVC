import "dotenv/config";
import express, { json } from "express";
import conn from "./config/conn.js";
import "./models/livroModel.js";
import "./models/funcionarioModel.js";
import "./models/clientesModel.js";

import livrosRoutes from "./routes/livrosRoutes.js";
import funcionariosRoutes from "./routes/funcionariosRoutes.js";
import clientesRoutes from "./routes/clientesRoutes.js";

const PORT = process.env.PORT;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(json());

app.use("/livros", livrosRoutes);
app.use("/funcionarios", funcionariosRoutes);
app.use("/clientes", clientesRoutes);

app.get("/", (req, res) => {
  res.send("Olá");
});

app.listen(PORT, () => {
  console.log("Server on PORT" + PORT);
});
