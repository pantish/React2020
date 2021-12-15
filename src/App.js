import React, {useEffect} from 'react';
import Context from './context';
import TodoList from './ToDo/TodoList';
import Loader from './Loader';
import { useState } from 'react/cjs/react.development';
import Modal from './Modal/Modal';

const AddTodo = React.lazy(
  () => 
  new Promise(resolve => {
    setTimeout(() => {
      resolve(import('./ToDo/AddTodo'))
    }, 3000)
  }))

function App() {
  const [todos, setTodos] = React.useState( [])
  const [loadind, setLoading] = React.useState(true)

useEffect(() => {
  fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
  .then(response => response.json())
  .then(todos => {
    setTimeout(() => {
      setTodos(todos)
      setLoading(false)
    }, 2000)
  })
}, [])

  function toggleTodo(id) {
    setTodos(todos.map(todo => {
      if (todo.id === id){
      todo.completed = !todo.completed
    }
    return todo
  }) 
  )
}

function removeTodo (id) {
  setTodos(todos.filter(todo => todo.id !== id))
}

function addTodo (title) {
  setTodos(
    todos.concat([
    {
    title,
    id: Date.now(),
    completed: false,
  }
]))
}
  return (
    <Context.Provider value={{removeTodo}}>
      <div className="wrapper">
        <h1>To do list:</h1>
        <Modal/>
        <React.Suspense fallback={<Loader/>}>
        <AddTodo onCreate={addTodo}/>
        </React.Suspense>

        {loadind && <Loader/>}
        {todos.length ? (
        <TodoList todos={todos} onToggle={toggleTodo}/>
        ) : loadind ? null : (
        <p>No todos</p>
        )}
      </div>
    </Context.Provider>
  );
}

export default App;
