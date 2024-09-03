const express = require("express");
const app = express();
const port = 80;
app.get("/", (req, res) => {
  const rotaPadrao = {
    nome_Rota: "/",
    codigo_status: "200",
    metodo: "GET",
  };
  res.status(200);
  res.json(rotaPadrao);
});
app.post("/", (req, res) => {
  const dadosRecebidos = req.body;
  const respostaPost = {
    nome_Rota: "/",
    codigo_status: "201",
    metodo: "POST",
    dados: dadosRecebidos,
  };
  res.status(201).json(respostaPost);
});
app.put("/", (req, res) => {
  const dadosAtualizados = req.body;
  const respostaPut = {
    nome_Rota: "/",
    codigo_status: "200",
    metodo: "PUT",
    dados: dadosAtualizados,
  };
  res.status(200).json(respostaPut);
});
app.delete("/", (req, res) => {
  const respostaDelete = {
    nome_Rota: "/",
    codigo_status: "204",
    metodo: "DELETE",
    mensagem: "Recurso excluído com sucesso",
  };
  res.status(204).json(respostaDelete);
});
app.listen(port, () => {
  console.log("Servidor em execução na porta ", port);
});
