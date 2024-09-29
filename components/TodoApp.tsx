import React, { useEffect, useState } from 'react'
import TodoList from './TodoList'
import { addTodo, getAllTodos } from '../utils/supabaseFunctions';
import { Todo } from '../utils/interface';

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>("")
  useEffect(() => {
    const getTodos = async () => {

      const todos = await getAllTodos();
      setTodos(todos)
      console.log(todos)
    }
    getTodos()

  }, [])


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    //Todo追加
    await addTodo(title)
    const todos = await getAllTodos();
    setTodos(todos)

    setTitle("")
  }

  return (
    <section className='text-center mb-2 text-2xl font-medium'>
      <h3>supabase todo app</h3>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          className='shadow-lg p-1 outline-none'
          onChange={(e) => setTitle(e.target.value)}
          value={title} />
        <button className='shadow-md border-2 px-1 py-1 rounded-lg bg-green-200'>Add</button>
      </form>
      <TodoList todos={todos} setTodos={setTodos}/>
    </section>
  )
}

export default TodoApp