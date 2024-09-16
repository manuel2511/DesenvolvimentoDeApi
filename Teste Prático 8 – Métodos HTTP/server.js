const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const JWT_SECRET = "Secret";

const verifyJWT = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ error: "Token não fornecido" });
  }

  const jwtToken = token.split(" ")[1];
  jwt.verify(jwtToken, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token inválido" });
    }
    req.user = decoded;
    next();
  });
};

app.post("/jwt/auth", (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username é obrigatório" });
  }
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });

  return res.json({ token });
});

app.get("/jwt/metodosHttp", verifyJWT, (req, res) => {
  const httpMethods = {
    get: {
      objetivo_principal: "Obter recursos do servidor",
      limite_caracteres:
        "Sem limite de caracteres no URL, mas recomenda-se até 2048",
      aceita_https: "Sim",
      aceita_http: "Sim",
    },
    put: {
      objetivo_principal: "Atualizar um recurso existente",
      limite_caracteres: "Sem limite",
      aceita_https: "Sim",
      aceita_http: "Sim",
    },
    post: {
      objetivo_principal: "Criar um novo recurso",
      limite_caracteres: "Sem limite",
      aceita_https: "Sim",
      aceita_http: "Sim",
    },
    patch: {
      objetivo_principal: "Atualizar parcialmente um recurso",
      limite_caracteres: "Sem limite",
      aceita_https: "Sim",
      aceita_http: "Sim",
    },
    delete: {
      objetivo_principal: "Excluir um recurso existente",
      limite_caracteres: "Sem limite",
      aceita_https: "Sim",
      aceita_http: "Sim",
    },
  };

  return res.json(httpMethods);
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
