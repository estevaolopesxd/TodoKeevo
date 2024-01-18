import React from 'react';
import './Card.css';


const Card = ({ index, task, onDelete, onComplete, onStarting, onPaused, onNext }) => {
  const { id, title, description, dueDate, status } = task;

  const handleDelete = () => {
    onDelete(id);
  }

  const handleComplete = () => {
    onComplete(id);
  }

  const handleStart = () => {
    onStarting(id)
  }

  const handlePause = () => {
    onPaused(id)
  }

  const handleNext = () => {
    onNext(id)
  }



  return (
    <div className='card'>
      <div className='headerTask'>
        <h4>{title}</h4>
        <div className='optionsCard'>
          <div className="dropdown">
            <a type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i className="fa-solid fa-ellipsis"></i>
            </a>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#" onClick={handleStart}>Em Andamento</a></li>
              <li><a className="dropdown-item" href="#" onClick={handleComplete}>Concluir</a></li>
              <li><a className="dropdown-item" href="#" onClick={handleNext}>Próximas</a></li>
              <li><a className="dropdown-item" href="#" onClick={handlePause}>Pausar</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#" onClick={handleDelete}>Excluir</a></li>


            </ul>

          </div>
        </div>
      </div>
      <div className='descriptionCard'>
        <p>{description}</p>
      
      <div className='footerCard'>

        {/* exibe o status de cada task */}
        <div className='status-card'>
          <p><i className='fa-solid fa-circle'></i></p>
          {status}
        </div>

        </div>

        <div className='iconsCard'>
            <div className='icons'>

          <p>
            <i className="fa-solid fa-calendar-days"></i>
            {dueDate}
          </p>

          <i className="fa-solid fa-check" onClick={handleComplete}></i>
            </div>

        </div>



        </div>
    </div>
  );
};

export default Card;