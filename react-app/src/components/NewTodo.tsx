import { useRef } from 'react'
import React from 'react'

interface NewToDoProps {
    onAddTodo: (text: string) => void
}

function NewTodo({ onAddTodo }: NewToDoProps) {
    const textInputRef = useRef<HTMLInputElement>(null)

    const todoSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault()
        const enteredText = textInputRef.current!.value
        onAddTodo(enteredText)
    }

    return (
        <form onSubmit={todoSubmitHandler}>
            <div>
                <label htmlFor="todo-text">Todo Text</label>
                <input type="text" id="todo-text" ref={textInputRef} />
            </div>
            <button type="submit">ADD TODO</button>
        </form>
    )
}
export default NewTodo
