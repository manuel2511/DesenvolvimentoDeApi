const express = require('express');
const app = express(); 
const port = 80;
app.get('/', (req, res) =>{
    const rotaPadrao = {
        nome_Rota: '/',
        codigo_status: '200',
        metodo: 'GET',
    }
    res.status(200)
    res.json(rotaPadrao);

})
app.listen(port, () => {
    console.log("Servidor em execução na porta ", port);
    
});
