const express = require("express")
const mysql = require("mysql2")

const app = express()

const conexao = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"cento_treinamento",
})

app.use(express.json())

const  produtos = []


app.post('/sessoes', (req, res) => {
    const sessoes = {
        aluno: req.body.aluno,
        personal: req.body.personal,
        tipo_treino: req.body.tipo_treino,
        data: req.body.data,
        horario: req.body.horario,
       observacoes: req.body.observacoes,

    }
    if (!sessoes.aluno || typeof sessoes.aluno != 'string' || sessoes.aluno.trim() == '') {
        return res.status(400).send('Nome do aluno é obrigatório e deve ser uma string não vazia.');
    }
    
    if (!sessoes.personal||typeof sessoes.personal!= 'string' || sessoes.personal.trim() == '') {
        return res.status(400).send('Nome do personal trainer é obrigatório e deve ser uma string não vazia.');
    }
    
    
    if (!sessoes.tipo_treino|| typeof sessoes.tipo_treino  != 'string' || sessoes.tipo_treino .trim() == '') {
        return res.status(400).send('tipo de treino  é obrigatório e deve ser uma string não vazia.');
    }
    
    if (!sessoes.data) {
        return res.status(400).send('data deve ser um número positivo.');
    }
    
    if (!sessoes.horario) {
        return res.status(400).send('horario deve ser obrigatório.');
    }
  
    conexao.query(
        "INSERT INTO sessoes (aluno,personal,tipo_treino,data, horario,observacoes) VALUES (?,?,?,?,?,?)",
        [sessoes.aluno ,sessoes.personal,sessoes.tipo_treino,sessoes.data, sessoes.horario,sessoes.observacoes ],
        () => {
            res.status(201).send("aluno cadastrado com sucesso!")
        }
    );
})

app.delete("/sessoes/:codigo",(req, res) => {
    const {codigo} = req.params

    conexao.query("DELETE FROM sessoes WHERE id = ?", [codigo], (err,results) => {
    if (err) {
        return res.status(500).send("erro ao deletar");
    }

    if (results.affectedRows===0){
        return res.status(404).send("sessao não encontrada")
    }
    res.status(200).send("sessao deletada com sucesso")
})

})

app.put ("/sessoes/:codigo",(req,res) => {
    const {codigo} = req.params;
    const {aluno,personal,tipo_treino,data,horario,observacoes}=req.body;

    const query = "UPDATE sessoes SET aluno =?,personal =?,tipo_treino =?,data =?,horario =?,observacoes =? WHERE id =?"
    conexao.query (query,[aluno,personal,tipo_treino,data,horario,observacoes,codigo], (err,results)=>{
        if(err) {
            return res.status(500).send("erro ao atualizar");
        }
        if (results.affectedRows ===0){
            return res.status(404).send ("sessao não encontrada");
        }
        res.send ("sessao atualizada com sucesso");
})

})



app.delete("/planos/:codigo",(req, res) => {
    const {codigo} = req.params

    conexao.query("DELETE FROM sessoes WHERE id = ?", [codigo], (err,results) => {
    if (err) {
        return res.status(500).send("erro ao deletar");
    }

    if (results.affectedRows===0){
        return res.status(404).send("plano não encontrado")
    }
    res.status(200).send("plano deletado com sucesso")
})

})

app.put ("/planos/:codigo",(req,res) => {
    const {codigo} = req.params;
    const {nome,duracao,preco,descricao}=req.body;

    const query = "UPDATE sessoes SET nome=?,duracao=?,preco=?,descricao=? WHERE id =?"
    conexao.query (query,[nome,duracao,preco,descricao,codigo], (err,results)=>{
        if(err) {
            return res.status(500).send("erro ao atualizar");
        }
        if (results.affectedRows ===0){
            return res.status(404).send ("plano não encontrado");
        }
        res.send ("plano atualizado com sucesso");
    })
})

app.post('/planos',(req,res) => {
    const{nome,duracao,preco,descricao} = req.body

    conexao.query(
        'INSERT INTO planos (nome,duracao,preco,descricao) VALUES (?,?,?,?)',
        [
            nome,
            duracao,
            preco,
            descricao,




        ],
        ()=> {
        res.status(201).send ('plano cadastrado com sucesso!')

    })
})
    app.get('/planos', (req, res) => {
        conexao.query("SELECT nome,duracao,preco,descricao from planos", (err, results) => {
            if(err) {
                return res.status(500).send("erro ao buscar o plano");
            }
            res.status(200).send(results);
        })
    })
    
    app.listen(3000, () => {
        console.log("Servidor backend rodando em http://localhost:3000")




})



app.get('/sessoes', (req, res) => {
    conexao.query("SELECT aluno,personal=?,tipo_treino,data, horario,observacoes from sessoes", (err, results) => {
        if(err) {
            return res.status(500).send("erro ao buscar o aluno");
        }
        res.status(200).send(results);
    })
})

app.listen(3000, () => {
    console.log("Servidor backend rodando em http://localhost:3000")
})