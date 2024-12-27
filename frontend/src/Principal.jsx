import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Principal.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Principal = () => {
    const [times, setTimes] = useState([]);
    const navigate = useNavigate();

    const carregaTimes = () => {
        axios.get(`http://localhost:7000/api/times`)
        .then(resposta => {
            console.log(resposta.data);
            setTimes(resposta.data);
        })
        .catch(erro => {
            console.log(`Falha ao buscar times: ${erro}`);
        });
    }

    const deletaTime = (id) => {
        axios.delete(`http://localhost:7000/api/times/${id}`)
        .then(resposta => {
            console.log(resposta.data);
            carregaTimes();
        })
        .catch(erro => {
            console.log(erro);
        });
    }

    const editaTime = (id) => {
        navigate(`/editTime/${id}`);
    }

    useEffect(() => {
        carregaTimes();
    }, []);

    return (
        <div>
            <h1 className='text-center mt-3'>Futebol Europeu</h1>
            <p className='mt-3 fs-4'>
                O futebol europeu é amplamente reconhecido como o epicentro
                do esporte mundial, onde clubes históricos, competições acirradas e
                jogadores lendários elevam o nível técnico e emocional dos jogos.
                Os maiores times da Europa não apenas conquistam troféus,
                mas também marcam a história do futebol com suas tradições, rivalidades e
                estilos de jogo inconfundíveis.
            </p> <br />
            <Link to="/newTime" style={{ textDecoration: 'none' }}>
                <button type="button" id='new' className="btn btn-warning" style={{ color: "white" }}>Cadastre um novo time</button>
            </Link>
            <div className="table-responsive shadow-lg p-3 mb-5 bg-white border border-5 rounded border-dark w-100 mx-auto">
                <table className='table'>
                    <thead>
                        <tr>
                            <th className='text-center'>Nome</th>
                            <th className='text-center'>País</th>
                            <th className='text-center'>Descrição</th>
                            <th className='text-center'>Imagem</th>
                            <th className='text-center'>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            times.map(time => (
                                <tr key={time.id}>
                                    <td className='text-center align-middle fs-5 fw-bolder'>{time.nome}</td>
                                    <td className='text-center align-middle fs-5 fw-bolder'>{time.pais}</td>
                                    <td className='text-center align-middle fs-5 fw-bolder'>{time.descricao}</td>
                                    <td className='text-center align-middle'>
                                        <img className='w-50 border border-5 rounded border-dark' style={{ padding: '10px' }} src={time.imagem} alt={time.id} />
                                    </td>
                                    <td className='d-flex justify-content-center align-items-center' style={{ height: '100px' }}>
                                        <div className='d-flex flex-column justify-content-center'>
                                            <button className='btn btn-primary mb-2' style={{ width: '100px' }} onClick={() => editaTime(time.id)}>Editar</button>
                                            <button className='btn btn-danger' style={{ width: '100px' }} onClick={() => deletaTime(time.id)}>Excluir</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Principal;