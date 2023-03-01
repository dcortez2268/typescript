import React from 'react'
import TodoList from './components/TodoList'

function App() {
    const todos = [{ id: 1, text: 'finish the course' }]
    return (
        <div className="App">
            <TodoList items={todos} />
        </div>
    )
}

export default App
