import { useEffect, useState } from "react";
import AppRoutes from "./AppRoutes";
import { getTodos } from "./api";
import { Link } from "react-router-dom";

function App(todo) {
  const [todos, setTodos] = useState([
    { id: 1, text: "Хлеб" },
    { id: 2, text: "Молоко" },
    { id: 3, text: "Сок" },
  ]);


  const deleteTodo = async (id) => {
    setTodos([...todos.filter((todo) => todo.id !== id)]);
  
    const newTodos = await deleteTodo(id);
  
    setTodos(newTodos.todos)
  };
  


  useEffect(() => {
    getTodos().then((todos) => {
      setTodos(todos.todos);
    });
  }, []);

  const [currentTodo, setCurrentTodo] = useState(null);

  return (
    <>
      {currentTodo ? (
        <div className="current-task">Текущая задача: {currentTodo.text}</div>
      ) : null}
      <h3>Навигация</h3>
      <Link to="/">Задачи</Link>
      <br />
      <Link to="/add">Добавить задачу</Link>
      <br />
      <Link to="/about">О проекте</Link>
      <br />
      <br />
      <AppRoutes
        setCurrentTodo={setCurrentTodo}
        todos={todos}
        setTodos={setTodos}
      ></AppRoutes>
         <button onClick={() => deleteTodo(todo.id)}>
                Удалить последнюю задачу
              </button>
    </>
  );
}

export default App;
