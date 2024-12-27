import { useState, useEffect } from 'react';
import './Editar.css'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Editar = () => {
    const [nome, setNome] = useState("");
    const [pais, setPais] = useState("");
    const [descricao, setDescricao] = useState("");
    const [imagem, setImagem] = useState("");
    const { id } = useParams();

    const navigate = useNavigate();

    const buscaTime = () => {
        axios.get(`https://timeseuropeus.onrender.com/api/times/${id}`)
        .then(resposta => {
            console.log(resposta.data);
            setNome(resposta.data[0].nome);
            setPais(resposta.data[0].pais);
            setDescricao(resposta.data[0].descricao);
            setImagem(resposta.data[0].imagem);
        })
        .catch(erro => {
            console.log(`Falha ao buscar times: ${erro}`);
        });
    }

    useEffect(() => {
        buscaTime();
    }, []);

    const editaTime = (event) => {
        event.preventDefault();
        axios.put(`https://timeseuropeus.onrender.com/api/times/${id}`, {nome, pais, descricao, imagem})
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
            <h2 className='text-center'>Edite um time Europeu</h2>
            <form onSubmit={editaTime}>
                <div className="mb-3">
                    <label>Nome:</label>
                    <input type="text" className="form-control" value={nome} onInput={(e) => {setNome(e.target.value)}}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">País:</label>
                    <input type="text" className="form-control" value={pais} onInput={(e) => {setPais(e.target.value)}}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Descrição: </label>
                    <input type="text" className="form-control" value={descricao} onInput={(e) => {setDescricao(e.target.value)}}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Imagem: </label>
                    <input type="text" className="form-control" value={imagem} onInput={(e) => {setImagem(e.target.value)}}/>
                </div>
                <button type="submit" className="btn btn-primary">Editar</button>
            </form>
        </div>
    );
}

export default Editar;