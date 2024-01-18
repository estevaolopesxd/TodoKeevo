import React, { useState, useEffect } from 'react';
import axios from 'axios';

// css
import './Tarefas.css';

// components
import Card from '../../Componets/Card/Card';
import Modal from '../../Componets/Modal/Modal';


const Tarefas = () => {
  const [tasks, setTasks] = useState([]); // useState para criar Task
  const [currentFilter, setCurrentFilter] = useState('Todas Tarefas'); // useState para verificar o filtro
  const [activeFilter, setActiveFilter] = useState('Todas Tarefas'); // Novo estado para rastrear o filtro ativo
  const [taskIdCounter, setTaskIdCounter] = useState(1) // useState para criar um ID + 1


  // vai buscar o json local
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/taskData');
        setTasks(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados do servidor JSON:', error);
      }
    };

    fetchData();
  }, []);

  // adiciona a task a coluna respectiva de acordo com o status
  const addTaskToStatus = async (status, task) => {
    try {
      const response = await axios.post('http://localhost:4000/taskData', {
        ...task,
        status,
        id: taskIdCounter,
      });
      setTasks((prevTasks) => [...prevTasks, response.data]);
      setTaskIdCounter(taskIdCounter + 1);
    } catch (error) {
      console.error('Erro ao adicionar nova tarefa:', error);
    }
  };

  //deleta a task
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:4000/taskData/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
    }
  };

  // atualiza o status da task
  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const response = await axios.patch(`http://localhost:4000/taskData/${taskId}`, {
        status: newStatus,
      });
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? response.data : task))
      );
    } catch (error) {
      console.error('Erro ao atualizar status da tarefa:', error);
    }
  };

  // muda o status da task para completo
  const completeTask = (index, taskId) => {
    updateTaskStatus(taskId, 'Completas');
  };

  // muda o status da task para pausadas
  const pauseTask = (index, taskId) => {
    updateTaskStatus(taskId, 'Pausadas');
  };

  // muda o status da task para Em Andamento
  const startTask = (index, taskId) => {
    updateTaskStatus(taskId, 'Em Andamento');
  };

  // muda o status da task para Proximas
  const nextTask = (index, taskId) => {
    updateTaskStatus(taskId, 'Proximas');
  };

  // filtros para as tasks e renderiza de acordo com filtro
  const filterTasks = () => {
    switch (currentFilter) {
      case 'Em Andamento':
      case 'Completas':
      case 'Proximas':
      case 'Pausadas':
        return tasks.filter((task) => task.status === currentFilter);
      default:
        return tasks;
    }
  };

  // se o filtro estiver ativo
  const handleFilterClick = (filter) => {
    setCurrentFilter(filter);
    setActiveFilter(filter);
  };

  return (
    <div className='tarefas'>

      {/* Icone flutuante de criar task */}
      <div className='iconNewTask'>
        <div className='circle'>
          <a href='#'>
            <Modal addTaskToStatus={addTaskToStatus} />
          </a>
        </div>
      </div>


      {/* todos os filtros e o botão de criar nova task */}
      <li className='filter'>
        <a href='#' onClick={() => handleFilterClick('Todas Tarefas')} className={activeFilter === 'Todas Tarefas' ? 'active' : ''}>Todas Tarefas</a>
        <a href='#' onClick={() => handleFilterClick('Em Andamento')} className={activeFilter === 'Em Andamento' ? 'active' : ''}>Em Andamento</a>
        <a href='#' onClick={() => handleFilterClick('Completas')} className={activeFilter === 'Completas' ? 'active' : ''}>Completas</a>
        <a href='#' onClick={() => handleFilterClick('Proximas')} className={activeFilter === 'Proximas' ? 'active' : ''}>Próximas</a>
        <a href='#' onClick={() => handleFilterClick('Pausadas')} className={activeFilter === 'Pausadas' ? 'active' : ''}>Pausadas</a>

        <a href="#">
          <Modal addTaskToStatus={addTaskToStatus} />
        </a>
      </li>

      {/* colunas respectivas para cada filtro e status */}
      <div className='filters container '>
        <div className='row around'>
          <div className='col-3'>
            <div className='status progress'></div>
            <a href='#'>Em Andamento</a>
          </div>

          <div className='col-3'>
            <div className='status completed'></div>
            <a href='#'>Completas</a>
          </div>

          <div className='col-3'>
            <div className='status nextTask'></div>
            <a href='#'>Próximas</a>
          </div>

          <div className='col-3'>
            <div className='status paused'></div>
            <a href='#'>Pausadas</a>
          </div>
        </div>
      </div>

      <div className='tasks'>
        <div className='row'>

          {/* renderiza tasks Em andamento */}
          <div className='col-3' id="sttInProgress">
            {/* filtra as tasks pelo status "Em Andamento", e renderiza o card */}
            {filterTasks()
              .filter((task) => task.status === 'Em Andamento')
              .map((task, index) => (
                <Card
                  key={task.id}
                  index={index}
                  task={task}
                  onDelete={() => deleteTask(task.id)}
                  onComplete={() => completeTask(index, task.id)}
                  onPaused={() => pauseTask(index, task.id)}
                  onStarting={() => startTask(index, task.id)}
                  onNext={() => nextTask(index, task.id)}
                />
              ))}
          </div>

          {/* renderiza tasks completas */}
          <div className='col-3' id="sttCompleted">
            {/* filtra as tasks pelo status "Completas", e renderiza o card */}
            {filterTasks()
              .filter((task) => task.status === 'Completas')
              .map((task, index) => (
                <Card
                  key={task.id}
                  index={index}
                  task={task}
                  onDelete={() => deleteTask(task.id)}
                  onComplete={() => completeTask(index, task.id)}
                  onPaused={() => pauseTask(index, task.id)}
                  onStarting={() => startTask(index, task.id)}
                  onNext={() => nextTask(index, task.id)}
                />
              ))}
          </div>

             {/* renderiza tasks Proximas */}
          <div className='col-3' id="sttNext">
            {/* filtra as tasks pelo status "Proximas", e renderiza o card */}
            {filterTasks()
              .filter((task) => task.status === 'Proximas')
              .map((task, index) => (
                <Card
                  key={task.id}
                  index={index}
                  task={task}
                  onDelete={() => deleteTask(task.id)}
                  onComplete={() => completeTask(index, task.id)}
                  onPaused={() => pauseTask(index, task.id)}
                  onStarting={() => startTask(index, task.id)}
                  onNext={() => nextTask(index, task.id)}
                />
              ))}
          </div>

          {/* renderiza tasks Pausadas */}
          <div className='col-3' id="sttPaused">
            {/* filtra as tasks pelo status "Pausadas", e renderiza o card */}
            {filterTasks()
              .filter((task) => task.status === 'Pausadas')
              .map((task, index) => (
                <Card
                  key={task.id}
                  index={index}
                  task={task}
                  onDelete={() => deleteTask(task.id)}
                  onComplete={() => completeTask(index, task.id)}
                  onPaused={() => pauseTask(index, task.id)}
                  onStarting={() => startTask(index, task.id)}
                  onNext={() => nextTask(index, task.id)}
                />
              ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Tarefas;
