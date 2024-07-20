import conn from "../config/conn.js"
import {v4 as uuidv4} from 'uuid'

export const getClientes = (request, response)=>{
    const sql = `SELECT * FROM clientes`
    conn.query(sql, (err, data)=>{
        if(err){
             response.status(500).json({message: "Erro ao buscar clientes"})
             return
        }
        const clientes = data
        response.status(200).json(clientes)
    })
}



export const atualizarCliente = (request, response)=>{
    const id = request.params;
    const { nome, email, senha, imagem } = request.body;
  
    if (!nome) {
      response.status(400).json({ message: "O nome é um campo obrigatório" });
      return;
    }
    if (!email) {
      response.status(400).json({ message: "O email é um campo obrigatório" });
      return;
    }
    if (!senha) {
      response.status(400).json({ message: "A senha é um campo obrigatório" });
      return;
    }
    if (!imagem) {
      response.status(400).json({ message: "O caminho da Imagem é um campo obrigatório" });
      return;
    }
    const checkSQL = /*sql*/ `SELECT * FROM clientes WHERE id = "${id}"`;
    conn.query(checkSQL, (err, data) => {
      if (err) {
        console.log(err);
        response.status(500).json({ message: "Erro ao buscar dados" });
        return;
      }
      if (data === 0) {
        response.status(404).json({ message: "cliente nao encontrado" });
        return;
      }
     
        const updateSQL = /*sql*/ `UPDATE clientes SET nome = "${nome}", email = "${email}", senha = "${senha}", imagem = "${imagem}"`;
        conn.query(updateSQL, (err) => {
          if (err) {
            console.error(err);
            return response
              .status(500)
              .json({ message: "Erro ao atualizar cliente" });
          }
          response
            .status(200)
            .json({ message: "dados do cliente atualizado" });
        });
      
    });
}

export const criarCliente = (request, response)=>{
    const { nome, email, senha, imagem} = request.body;
  if (!nome) {
    response.status(400).json({ message: "O nome é um campo obrigatório" });
  }
  if (!email) {
    response.status(400).json({ message: "O email é um campo obrigatório" });
  }
  if (!senha) {
    response.status(400).json({ message: "A senha é um campo obrigatório" });
  }
  if (!imagem) {
    response.status(400).json({ message: "A imagem é um campo obrigatório" });
  }


    const id = uuidv4();
    const insertSQL = /*sql*/ ` INSERT INTO clientes (id, nome, email, senha, imagem)
    VALUES
    ("${id}","${nome}","${email}","${senha}","${imagem}")`;
    conn.query(insertSQL, (err) => {
      if (err) {
        console.error(err);
        response.status(500).json({ message: "Cadastrar cliente" });
        return;
      }
      response
        .status(201)
        .json({ message: "cliente cadastrado com sucesso" });
    });
}

export const unicoCliente = (request, response)=>{
    const { id } = request.params;
    const SQL = /*sql*/ `SELECT * FROM clientes WHERE id = "${id}"`;
  
    conn.query(SQL, (err, data) => {
      if (err) {
        response.status(500).json({ message: "Erro ao listar clientes" });
        return console.log(err);
      }
      const clientes = data;
      if (clientes.length === 0) {
        response
          .status(404)
          .json({ message: "Nao existe clientes cadastrados" });
        return;
      }
      response.status(200).json(clientes);
    });
}



