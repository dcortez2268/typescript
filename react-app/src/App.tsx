import React, { useState } from 'react'
import TodoList from './components/TodoList'
import NewTodo from './components/NewTodo'
import Todo from '../models/todo'

function App() {
    const [todos, setTodos] = useState<Todo[]>([])

    const addTodoHandler = (text: string) => {
        console.log(text)
        setTodos((prevTodos) => [
            ...prevTodos,
            { id: Math.random().toString(), text },
        ])
    }

    const deleteTodoHandler = (id: string) => {
        setTodos((prevTodos) => prevTodos.filter((td) => td.id !== id))
    }

    return (
        <div className="App">
            <NewTodo onAddTodo={addTodoHandler} />
            <TodoList items={todos} onDelete={deleteTodoHandler} />
        </div>
    )
}

export default App
