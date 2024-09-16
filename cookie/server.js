const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cookieParser());

// Rota para criar um cookie
app.post('/cookie/criar', (req, res) => {
    const { name, value } = req.body;
    res.cookie(name, value, { httpOnly: true });
    res.status(201).json({
        mensagem: 'Cookie criado com sucesso',
        cod_status: 201
    });
});

// Rota para ler um cookie
app.get('/cookie/ler', (req, res) => {
    const { name } = req.query;
    const value = req.cookies[name];
    if (value) {
        res.status(200).json({
            mensagem: `O nome do cookie é ${name} e o valor é ${value}`,
            cod_status: 200
        });
    } else {
        res.status(404).json({
            mensagem: 'Cookie não encontrado',
            cod_status: 404
        });
    }
});

// Rota para atualizar um cookie
app.put('/cookie/atualizar', (req, res) => {
    const { name, value } = req.body;
    res.cookie(name, value, { httpOnly: true });
    res.status(200).json({
        mensagem: `O cookie foi atualizado. Novo nome: ${name} e novo valor: ${value}`,
        cod_status: 200
    });
});

// Rota para excluir um cookie
app.delete('/cookie/excluir', (req, res) => {
    const { name } = req.query;
    res.clearCookie(name);
    res.status(200).json({
        mensagem: 'Cookie excluído com sucesso',
        cod_status: 200
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
