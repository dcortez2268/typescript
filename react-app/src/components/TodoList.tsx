import Todo from '../../models/todo'

interface TodoListProps {
    items: Todo[]
    onDelete: (id: string) => void
}

function TodoList({ items, onDelete }: TodoListProps) {
    return (
        <ul>
            {items.map((todo) => (
                <li key={todo.id}>
                    <span>{todo.text}</span>
                    <button onClick={onDelete.bind(null, todo.id)}>
                        DELETE
                    </button>
                </li>
            ))}
        </ul>
    )
}
export default TodoList
