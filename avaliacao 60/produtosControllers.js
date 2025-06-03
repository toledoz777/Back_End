const conexao = require ('../db/conexao');

exports.criarProduto = (req, res) => {
    const {nome, preco, quantidade} = req.body;
        conexao.query(
            'INSERT INTO produtos (nome,preco,quantidade) VALUES(?,?,?)',
            [nome,preco,quantidade],
            (err)=> {
                if (err) return res.status (500).send('Erro ao cadastrar produto');
                res.status(201).send('Produto cadastrado com sucesso!');
            });
        };


exports.listaProdutos = (req, res) => {
    conexao.query ('SELECT*FROM produtos', (err, results) => {
        if (err) return res.status(500).send('Erro ao buscar produtos');
        res.status(200).send(results);
    });
};

exports.atualizarProduto = (req,res) => {
    const {id} = req.params;
    const {nome,preco} = req.body;
    const query = 'UPDATE produtos SET nome =?,preco =? WHERE id =?';

    conexao.query(query,[nome,preco,id],(err,results) => {
        if (err) return res.status(500).send ('Erro ao atualizar');
        if (results.affectedRows === 0) return res.status(404).send ('Produto não encontrado');
        res.status(200).send('Produto atualizado com sucesso');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
    });
};

exports.deletarProduto = (req,res) => {
    const {id} =req.params;

    conexao.query ('DELETE FROM produtos WHERE id = ?', [id],(err, results) => {
        if (err) return res.status(500).send ('Erro ao deletar');
        if (results.affectedRows === 0) return res.status(404).send ('Produto não encontrado');
        res.status(200).send ('Produto deletado com sucesso');
    });
};