const express = require('express')
const conexao = require ('./db/conexao')

const app = express()

app.use(express.json())



app.post('/produtos', (req, res) => {
    const { nome, preco, quantidade } = req.body

    conexao.query(
        'INSERT INTO produtos (nome, preco, quantidade) VALUES (?,?,?)',
        [
            nome,
            preco, 
            quantidade, 
        ],
        () => {
            res.status(201).send('Consulta cadastrada com sucesso!')
    })

})


app.delete('/produtos/:id', (req, res) => {
  const { id } = req.params;

  conexao.query('DELETE FROM produtos WHERE id = ?', [id], (err, results) => {
    if (err) {
        return res.status(500).send('Erro ao deletar');
    }
    if (results.affectedRows === 0) {
        return res.status(404).send('Produto não encontrado');
    }

    res.status(200).send('Produto deletado com sucesso');
  });
});

app.put('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const { nome, preco, quantidade } = req.body;

  const query = 'UPDATE produtos SET nome = ?, preco = ?, quantidade = ? WHERE id = ?';
  conexao.query(query, [nome, preco, quantidade, id], (err, results) => {
    if (err) {
        return res.status(500).send('Erro ao atualizar');
    }

    if (results.affectedRows === 0) {
        return res.status(404).send('Produto não encontrado');
    }
    
    res.send('Produto atualizado com sucesso');
  });
});

app.get('/produtos', (req, res) => {
    conexao.query('SELECT * FROM  produtos', (err, results) => {
        if (err) {
            res.status(500).send('Erro ao buscas produtos')
        }

        res.status(200).send(results)
    })
})


app.listen(3000, () => {
    console.log("Servidor backend rodando em http://localhost:3000")
})
