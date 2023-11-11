import { useEffect, useState } from 'react'
import './styles.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Card from './components/card';

function App() {
  const [task, setTask] = useState('');
  const[tasks, setTasks] = useState([]); /* note que para listas utiliza [] dentro do useState */

  const handleTask = (e) => { /* usei const invés de function */
     /*  evita que a página seja recarregada quando o formulário é enviado.*/
    e.preventDefault();

    if (tasks.length >= 50) {
      alert("Você atingiu o limite tasks que podem ser adicionados."); /* limite de tasks na tela */
      return;
    }
    
    setTasks([...tasks,
      {
        description: task,
        checked: false
      }
      ]);

    /* Atualiza o estado tasks adicionando a nova tarefa (task) à lista existente (...tasks). 
    Isso preserva as tarefas antigas e adiciona a nova tarefa, também há atributos para diferenciá-los */

    setTask('');
    /* limpa o campo */
  }

  const handleCheckbox = (task) => {
    const newList = tasks.map(item => {

      if (item.description === task) {
        return { ...item, checked: !item.checked }; // Atualiza apenas o atributo 'checked'
      }
      return item; // Mantém os outros objetos inalterados
    });

    setTasks(newList);
  }

  const handleKeyPress = (event) => { /* para utilizar o enter como submit */
    if (event.key === 'Enter') {
      event.preventDefault(); 
    }
  };

  const handleDelete = (taskToDelete) => {
    const newList = tasks.filter(item => item.description !== taskToDelete);
    // filter cria uma nova lista e sem seguida verifica quais items de taks são diferentes daquele que vai deletar
    // se for diferente, entra na nova lista com todos menos ele.

    setTasks(newList); // seta nova lista
  }

  return (
    <>
      <header>
        <h1>To do List</h1>
      </header>
      <Router>
      <main>
        <div className='conteudo'>
          <div className='tipos'>

            <Link to = "/" style={{textDecoration: "none", color: "#000"}}>
              <h2 className='all'>All</h2>
            </Link>

            <Link to = "/Undone" style={{textDecoration: "none", color: "#000"}}>
              <h2 className='undone'>Undone</h2>
            </Link>

            <Link to = "/Done" style={{textDecoration: "none", color: "#000"}}>
              <h2 className='done'>Done</h2>
            </Link>

          </div>
        <div class="minus icon"></div>
          <form onSubmit={handleTask}>
          <div class="group">
            <input 
              placeholder="Add details" 
              type="text" 
              className="input"
              value={task} /* muito importante acrescentar para que o campo seja limpo após envio do formulário */
              onChange={(e) => 
                setTask(e.target.value)
              }
              onKeyUp={handleKeyPress}
              /* notei que só aperece as funções e funciona se cada uma tiver em uma linha para cada */
              />
            
              <button class="button" onClick={handleTask}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 20 20" height="20" fill="none" class="svg-icon"><g stroke-width="1.5" stroke-linecap="round" stroke="#de8a2a"><circle r="7.5" cy="10" cx="10"></circle><path d="m9.99998 7.5v5"></path><path d="m7.5 9.99998h5"></path></g></svg>
                <span class="lable">Add</span>
              </button>
            </div>
          </form>
          <Routes>
          
          {/* Todas as tasks */}
            <Route 
            path = "/" 
            element = {tasks.map((item, index) => (
                        <Card key={index} task={item.description} onDelete={handleDelete} checkbox = {handleCheckbox} checked = {item.checked} />
                      ))}
            />
            <Route
            path = "/Undone"
            element = {tasks
                .filter(objeto => objeto.checked === false)
                .map((objeto, index) => (
                  <Card key={index} task={objeto.description} onDelete={handleDelete} checkbox = {handleCheckbox} checked = {objeto.checked} />
                ))}
            />

            <Route
            path = "/Done"
            element = {tasks
                .filter(objeto => objeto.checked === true)
                .map((objeto, index) => (
                  <Card key={index} task={objeto.description} onDelete={handleDelete} checkbox = {handleCheckbox} checked = {objeto.checked} />
                ))}
            />

          </Routes>
        </div>
      </main>
      </Router>
      <footer>
        <h4>Created by marcelopetroni - devChallenges.io</h4>
      </footer>
    </>
  )
}

export default App