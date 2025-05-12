const express = require ('express')

const app = express ()

app.use(express.json())

app.post('/usuario', (req,res) => {
    const nome = req.body.nome
    const cargo = req.body.cargo

    res.send("Usuário " + nome + " criado com sucesso. cargo:" +cargo)
})


app.get('/', (req, res) => {
    res.send('Bem-vindo ao servidor Express!')
})


app.get('/Sobre', (req,res) => {
    res.send ('Este é um exemplo com rotas.');
})

app.get('/contato', (req,res) => {
    res.send ('Entr em contato pelo e-mail: seuemail@gmail.com');
})

app.listen (3000, () => {
    console.log ('Servidor rodando em http:localhost:3000');
})
