import React from 'react';
import TodoItem from './TodoItem';

export default function TodoList({ todos, toggleDone, removeTodo }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} toggleDone={toggleDone} removeTodo={removeTodo} />
      ))}
    </ul>
  );
}