const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());
const JWT_SECRET = "secreta";

// rota para listar as JWTs claims e suas definições
app.get("/jwt/claims", (req, res) => {
  const claims = {
    iss: "Issuer - Identifica quem emitiu o JWT",
    sub: "Subject - Identifica o assunto do JWT",
    aud: "Audience - Destinatário do JWT",
    exp: "Expiration Time - Tempo de expiração",
    nbf: "Not Before - JWT não pode ser aceito antes desse tempo",
    iat: "Issued At - Quando o JWT foi emitido",
    jti: "JWT ID - Identificador único do JWT",
  };
  res.json(claims);
});

app.post("/jwt/tokenid", (req, res) => {
  try {
    const token = jwt.sign(
      {
        id: 1,
        iat: Math.floor(Date.now() / 1000),
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Erro ao gerar token" });
  }
});
app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
