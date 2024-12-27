import { useState, useEffect } from 'react';
import './Gravar.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Gravar = () => {
    const [nome, setNome] = useState("");
    const [pais, setPais] = useState("");
    const [descricao, setDescricao] = useState("");
    const [imagem, setImagem] = useState("");

    const navigate = useNavigate();

    const newTime = (event) => {
        event.preventDefault();
        axios.post(`http://localhost:7000/api/times`, {nome, pais, descricao, imagem})
        .then(resposta => {
            console.log(resposta);
            navigate("/");
        })
        .catch(erro => {
            console.log(erro);
        })
    }

    return (
        <div className="container mt-5 shadow-lg p-4 rounded">
            <h2 className='text-center'>Cadastre um novo time Europeu</h2>
            <form onSubmit={newTime}>
                <div className="mb-3">
                    <label>Nome:</label>
                    <input type="text" className="form-control" onInput={(e) => {setNome(e.target.value)}}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">País:</label>
                    <input type="text" className="form-control" onInput={(e) => {setPais(e.target.value)}}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Descrição: </label>
                    <input type="text" className="form-control" onInput={(e) => {setDescricao(e.target.value)}}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Imagem: </label>
                    <input type="text" className="form-control" onInput={(e) => {setImagem(e.target.value)}}/>
                </div>
                <button type="submit" className="btn btn-primary">Cadastrar</button>
            </form>
        </div>
    );
}

export default Gravar;