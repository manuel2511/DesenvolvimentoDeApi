const express = require("express");
const app = express();
const port = 80;
app.get("/", (req, res) => {
  const authHeader = req.headers.authorization;
  try {
    if (authHeader && authHeader === "123456") {
      const rotaPadrao = {
        token: "123456",
        codigo_status: "200",
        metodo: "GET",
      };
      res.status(200).json('Acesso autorizado');
    } else {
      throw new Error("Acesso não autorizado");

    }
  } catch (error) {
    res.status(401);
    res.json('Acesso nao autorizado');
  }
  
  
});
app.listen(port, () => {
  console.log("Servidor em execução na porta ", port);
});
