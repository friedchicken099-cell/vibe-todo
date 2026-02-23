// src/App.jsx
import React, { useState } from 'react';
import useTodos from './hooks/useTodos';
import TodoList from './components/TodoList';
import './index.css';

export default function App() {
  const { todos, addTodo, toggleDone, removeTodo } = useTodos();
  const [newTodo, setNewTodo] = useState('');
  const [category, setCategory] = useState('Business');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    addTodo({ text: newTodo, category });
    setNewTodo('');
  };

  const businessTodos = todos.filter(t => t.category === 'Business');
  const personalTodos = todos.filter(t => t.category === 'Personal');

  return (
    <div className="app-container">
      {/* Input form at top */}
      <form onSubmit={handleSubmit} className="input-top">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a task..."
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Business">Business</option>
          <option value="Personal">Personal</option>
        </select>
        <button type="submit">Add</button>
      </form>

      {/* Columns */}
      <div className="columns-container">
        <div className="column">
          <h2>BUSINESS</h2>
          <TodoList todos={businessTodos} toggleDone={toggleDone} removeTodo={removeTodo} />
        </div>
        <div className="column">
          <h2>PERSONAL</h2>
          <TodoList todos={personalTodos} toggleDone={toggleDone} removeTodo={removeTodo} />
        </div>
      </div>
    </div>
  );
}