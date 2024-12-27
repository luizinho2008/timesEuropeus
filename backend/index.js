const express = require("express");
const db = require("./db");
const cors = require("cors");

const port = 7000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/times", (req, res) => {
    const sql = `SELECT * FROM times`;
    db.query(sql, (erro, resultados) => {
        if (erro) {
            res.status(500).json({message: "Falha ao fazer a consulta no MySQL"});
        } else {
            res.json(resultados);
        }
    });
});

app.post("/api/times", (req, res) => {
    const {nome, pais, descricao, imagem} = req.body;
    const sql = `INSERT INTO times(nome, pais, descricao, imagem) VALUES (?, ?, ?, ?)`;
    db.query(sql, [nome, pais, descricao, imagem], (erro, resultados) => {
        if (erro) {
            res.status(500).json({message: "Falha ao inserir torcedor no MySQL"});
        } else {
            res.status(201).json(resultados);
        }
    });
});

app.get("/api/times/:id", (req, res) => {
    const sql = `SELECT * FROM times WHERE id = ?`;
    db.query(sql, [req.params.id], (erro, resultados) => {
        if (erro) {
            res.status(500).json({message: "Falha ao fazer a consulta no MySQL"});
        } else {
            res.json(resultados);
        }
    });
});

app.put("/api/times/:id", (req, res) => {
    const {nome, pais, descricao, imagem} = req.body;
    const sql = `UPDATE times SET nome = ?, pais = ?, descricao = ?, imagem = ? WHERE id = ?`;
    db.query(sql, [nome, pais, descricao, imagem, req.params.id], (erro, resultados) => {
        if (erro) {
            res.status(500).json({message: "Falha ao atualizar torcedor no MySQL"});
        } else {
            res.json(resultados);
        }
    });
});

app.delete("/api/times/:id", (req, res) => {
    const sql = `DELETE FROM times WHERE id = ?`;
    db.query(sql, [req.params.id], (erro, resultados) => {
        if (erro) {
            res.status(500).json({message: "Falha ao deletar torcedor no MySQL"});
        } else {
            res.json(resultados);
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando com express na porta ${port}`);
});