import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function useTodos() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = ({ text, category }) => {
    const dateAdded = new Date().toLocaleDateString();
    // Add to **top** of the list
    setTodos([{ id: uuidv4(), text, done: false, category, dateAdded }, ...todos]);
  };

  const toggleDone = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  return { todos, addTodo, toggleDone, removeTodo };
}