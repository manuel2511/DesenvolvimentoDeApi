const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3999;

const secretKey = "secreta";

app.use(bodyParser.json());

const users = [
  { username: "user1", password: "password1" },
  { username: "user2", password: "password2" },
];

// Mock de produtos
const products = [
  { id: 1, nome: "escova de dente", preco: "10.00" },
  { id: 2, nome: "shampoo", preco: "40.00" },
];

app.post("/auth/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    const token = jwt.sign({ username: user.username }, secretKey, {
      expiresIn: "1h",
    });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Usuário ou senha inválidos" });
  }
});

const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (token) {
    jwt.verify(token, secretKey, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

app.get("/produtos", authenticateJWT, (req, res) => {
  res.json({ produtos: products });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
