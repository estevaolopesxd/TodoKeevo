import React from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from 'react';

//css
import './App.css';

//pages
import Dashboard from './Pages/Dashboard/Dashboard';
import Projetos from './Pages/Projetos/Projetos'
import Equipe from './Pages/Equipe/Equipe'
import Tarefas from './Pages/Tarefas/Tarefas'
import Colaboracao from './Pages/Colaboracao/Colaboracao'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  //abre e fecha menu lateral (desativado)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="App">

      <BrowserRouter>
        <div className='container'>
          <div className='row'>
            <div className={`menu col-3 d-none ${isMenuOpen ? 'open' : ''}`} >

              <h1>Lista de Tarefas</h1>

              <div className='subMenu'>
                <p className='subTitle'> <Link to="/tarefas">Menu Principal</Link> </p>

                <div className='options-1'>
                  <li className='list'>
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/projetos">Projetos</Link>
                    <Link to="/equipe">Equipe</Link>
                  </li>
                </div>


                <p className='subTitle'>Tarefas</p>

                <div className='options-2'>

                  <li className='list'>
                    <Link to="/tarefas">Tarefas</Link>
                    <Link to="/colaboracao">Colaboração</Link>

                  </li>

                </div>

              </div>

              {(isMenuOpen && (
                <div className="menu-icon" onClick={() => toggleMenu()}>
                  &#9776; {/* Ícone de menu hamburguer Unicode quando o menu está aberto */}
                </div>
              )) || (!isMenuOpen && (
                <div className="menu-icon" onClick={() => toggleMenu()}>
                  &#9776; {/* Ícone de menu hamburguer Unicode quando o menu está fechado */}
                </div>
              ))}
            </div>


            <div className={`container  ${isMenuOpen ? 'content-open' : ''}`}>
          
                <h1 className='text-white mt-3'>Menu</h1>
              <div className='content'>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/projetos" element={<Projetos />} />
                  <Route path="/equipe" element={<Equipe />} />
                  <Route path="/tarefas" element={<Tarefas />} />
                  <Route path="/colaboracao" element={<Colaboracao />} />
                  <Route path="/" element={<Tarefas/>} />
                </Routes>
              </div>
      
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>

  );
}

export default App;
