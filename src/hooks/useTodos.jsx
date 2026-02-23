// src/hooks/useTodos.jsx
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase'; // make sure this line is like this

export default function useTodos() {
  const [todos, setTodos] = useState([]);

  // Listen to Firestore updates
  useEffect(() => {
    const q = query(collection(db, "todos"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const todosData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTodos(todosData);
    });
    return () => unsubscribe();
  }, []);

  // Add a new todo
  const addTodo = async ({ text, category }) => {
    const dateAdded = new Date().toLocaleDateString();
    await addDoc(collection(db, "todos"), {
      text,
      category,
      done: false,
      dateAdded,
      createdAt: new Date()
    });
  };

  // Toggle completed
  const toggleDone = async (id) => {
    const todoRef = doc(db, "todos", id);
    const todo = todos.find(t => t.id === id);
    if (todo) {
      await updateDoc(todoRef, { done: !todo.done });
    }
  };

  // Delete a todo
  const removeTodo = async (id) => {
    const todoRef = doc(db, "todos", id);
    await deleteDoc(todoRef);
  };

  return { todos, addTodo, toggleDone, removeTodo };
}