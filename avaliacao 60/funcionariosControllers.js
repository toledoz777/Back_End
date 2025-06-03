const conexao = require ('../db/conexao');

exports.criarFuncionario = (req, res) => {
    const {nome, cargo, idade} = req.body;
        conexao.query(
            'INSERT INTO funcionarios (nome,cargo,idade) VALUES(?,?,?)',
            [nome,cargo,idade],
            (err)=> {
                if (err) return res.status (500).send('Erro ao cadastrar funcionario');
                res.status(201).send('Funcionario cadastrado com sucesso!');
            });
        };


exports.listaFuncionario = (req, res) => {
    conexao.query ('SELECT*FROM funcionarios', (err, results) => {
        if (err) return res.status(500).send('Erro ao buscar funcionarios');
        res.status(200).send(results);
    });
};

exports.atualizarFuncionario = (req,res) => {
    const {id} = req.params;
    const {nome,cargo,idade} = req.body;
    const query = 'UPDATE funcionarios SET nome =?,cargo =?, idade = ? WHERE id =?';

    conexao.query(query,[nome,cargo,idade,id],(err,results) => {
        if (err) return res.status(500).send ('Erro ao atualizar');
        if (results.affectedRows === 0) return res.status(404).send ('funcionario não encontrado');
        res.status(200).send('funcionario atualizado com sucesso');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
    });
};

exports.deletarFuncionario = (req,res) => {
    const {id} =req.params;

    conexao.query ('DELETE FROM funcionarios WHERE id = ?', [id],(err, results) => {
        if (err) return res.status(500).send ('Erro ao deletar');
        if (results.affectedRows === 0) return res.status(404).send ('funcionario não encontrado');
        res.status(200).send ('funcionario deletado com sucesso');
    });
};