import conn from "../config/conn.js"
import {v4 as uuidv4} from 'uuid'

export const getLivros = (request, response)=>{
    const sql = `SELECT * FROM livros`
    conn.query(sql, (err, data)=>{
        if(err){
             response.status(500).json({message: "Erro ao buscar livros"})
             return
        }
        const livros = data
        response.status(200).json(livros)
    })
}


export const cadastrarLivro = (request, response) =>{
    const { titulo, autor, ano_publicacao, genero, preco } = request.body;
    //validação
    if (!titulo) {
      response.status(400).json({ message: "O título é obrigatório" });
    }
    if (!autor) {
      response.status(400).json({ message: "O autor é obrigatório" });
    }
    if (!ano_publicacao) {
      response.status(400).json({ message: "O ano de publicaçâo é obrigatório" });
    }
    if (!genero) {
      response.status(400).json({ message: "O gênero é obrigatório" });
    }
    if (!preco) {
      response.status(400).json({ message: "O preço é obrigatório" });
    }
    //Cadastrar um livro -> antes preciso saber se esse livro existe
    const checkSQL = /*sql*/ `SELECT * FROM livros
    WHERE titulo = "${titulo}" AND autor = "${autor}" AND ano_publicacao = "${ano_publicacao}"`;
  
    conn.query(checkSQL, (err, data) => {
      if (err) {
        response.status(500).json({ message: "Erro ao buscar os livros" });
        return console.log(err);
      }
  
      if (data.length > 0) {
        response.status(409).json({ message: "Livro já existe" });
        return console.log(err);
      }
  
      const id = uuidv4();
      const disponibilidade = 1; // 1(o livro ta disponível)
  
      const insertSQL = /*sql*/ `INSERT INTO livros
      (id,titulo,autor,ano_publicacao,genero,preco, disponibilidade)
      VALUES
      ("${id}","${titulo}","${autor}","${ano_publicacao}","${genero}","${preco}","${disponibilidade}")`;
  
      conn.query(insertSQL, (err) => {
        if (err) {
          response.status(500).json({ message: "Erro ao cadastrar livro" });
          return console.log(err);
        }
        response.status(201).json({ message: "Livro cadastrado" });
      });
    });
}


export const excluirLivro = (request, response)=>{
    const { id } = request.params;
  const deleteSQL = `DELETE FROM livros`;
  conn.query(deleteSQL,(err,info)=>{
    if(err){
      response.status(500).json({message: "Erro ao deletar livro"})
      return
    }

    if(info.affectedRows === 0){
      response.status(404).json({message: "Livro não encontrado"})
      return
    }

    response.status(200).json({message: "Livro excluido"})

  })
}


export const unicoLivro = (request, response)=>{
    const { id } = request.params;

    const sql = /*sql*/ `SELECT * FROM livros WHERE id = "${id}"`;
    conn.query(sql, (err, data) => {
      if (err) {
        console.error(err);
        response.status(500).json({ message: "Erro ao buscar livro" });
        return;
      }
  
      if (data.length === 0) {
        response.status(404).json({ message: "Livro não encontrado" });
        return;
      }
      const livro = data[0];
      response.status(200).json(livro);
    });
}


export const atualizarUsuario = (request, response)=>{

    const { titulo, autor, ano_publicacao, genero, preco, disponibilidade } = request.body;
  const { id } = request.params;

  if (!titulo) {
    response.status(400).json({ message: "O título é obrigatório" });
    return;
  }
  if (!autor) {
    response.status(400).json({ message: "O autor é obrigatório" });
    return;
  }
  if (!ano_publicacao) {
    response.status(400).json({ message: "O ano de publicaçâo é obrigatório" });
    return;
  }
  if (!genero) {
    response.status(400).json({ message: "O gênero é obrigatório" });
    return;
  }
  if (!preco) {
    response.status(400).json({ message: "O preço é obrigatório" });
    return;
  }

  if (disponibilidade === undefined) {
    response.status(400).json({ message: "A disponibilidade é obrigatório" });
    return;
  }

  const checkSql = /*sql*/ `SELECT * FROM livros WHERE id = "${id}"`;
  conn.query(checkSql, (err, data) => {
    if (err) {
      console.error(err);
      response.status(500).json({ message: "Book not found" });
    }
    if (data.length === 0) {
      return response.status(404).json({ message: "Livro não encontrado" });
    }

    const updateSql = `UPDATE livros SET titulo = "${titulo}", autor = "${autor}", ano_publicacao = "${ano_publicacao}", genero = "${genero}",disponibilidade = "${disponibilidade}",preco = "${preco}" WHERE id = "${id}"`;

    conn.query(updateSql, (err) => {
      if (err) {
        console.log(err);
        response.status(500).json({ message: "Erro ao atualizar livro " });
        return;
      }
      response.status(200).json({ message: "Livro atualizado" });
    });
  });
 
}
