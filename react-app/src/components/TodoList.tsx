interface TodoListProps {
    items: { id: number; text: string }[]
}

function TodoList({ items }: TodoListProps) {
    return (
        <ul>
            {items.map((todo) => (
                <li key={todo.id}>{todo.text}</li>
            ))}
        </ul>
    )
}
export default TodoList
