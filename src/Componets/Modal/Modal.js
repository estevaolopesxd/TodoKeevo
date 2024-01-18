import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './Modal.css'

const Modal = () => {
  const [showModal, setShowModal] = useState(false);
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: '',
  });




  // Função para buscar dados do servidor JSON local
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/taskData');
      setTaskData(response.data); // Atualize o estado com os dados recebidos
    } catch (error) {
      console.error('Erro ao buscar dados do servidor JSON:', error);
    }
  };

  useEffect(() => {
    // Chame a função para buscar dados quando o componente for montado
    fetchData();
  }, []); // O segundo argumento vazio garante que a solicitação seja feita apenas uma vez durante a montagem do componente


  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setTaskData({
      title: '',
      description: '',
      dueDate: '',
      status: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }


  const newTask = async (e) => {
    e.preventDefault();

    if (taskData.title === '' || taskData.description === '' || !taskData.status  || !taskData.dueDate) {
      alert('Por favor, preencha os campos');
    } else {
      try {

        // formatar a data usando a função formatDate
        const formattedDueDate = formatDate(taskData.dueDate)

        //cria copia dos dados e formata com a data
        const taskDataaWithFormattedDate = {
          ...taskData,
          dueDate: formattedDueDate,
        }

        // Realiza a requisição POST para adicionar uma nova tarefa no servidor
        await axios.post('http://localhost:4000/taskData', taskDataaWithFormattedDate);
        // Após criar a tarefa, busca os dados atualizados do servidor
        fetchData();
        closeModal();
      } catch (error) {
        console.error('Erro ao criar nova tarefa:', error);
      }
    }
  };




  return (
    <div>
      <i className="fa-solid fa-plus" onClick={openModal}></i>

      {showModal && (
        <div
          className={`modal fade ${showModal ? 'show' : ''}`}
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          style={{ display: showModal ? 'block' : 'none' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5 text-white" id="exampleModalLabel">
                  Nova Tarefa
                </h1>
                <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div id="newTask">
                  <fieldset>
                    <form className='form'>
                      <label>Titulo</label>
                      <input type='text' className='form-control' name='title' onChange={handleInputChange} value={taskData.title} />

                      <label>Descrição</label>
                      <input type='text' className='form-control' name='description' onChange={handleInputChange} value={taskData.description} />

                      <label>Data prevista</label>
                      <input type='date' className='form-control' name='dueDate' onChange={handleInputChange} value={taskData.dueDate} />

                      <label>Status</label>
                      <select className='form-control' name='status' onChange={handleInputChange} value={taskData.status}>
                        <option value=''>--</option>
                        <option value='Em Andamento'>Em Andamento</option>
                        <option value='Completas'>Completas</option>
                        <option value='Proximas'>Próximas</option>
                        <option value='Pausadas'>Pausadas</option>
                      </select>
                    </form>
                  </fieldset>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-success" onClick={newTask}>
                 Criar
                </button>
              </div>
            </div>
          </div>
        </div>

      )}
    </div>
  );
};

export default Modal;
