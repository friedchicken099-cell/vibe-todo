// src/hooks/useTodos.js
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../firebase';
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

export default function useTodos() {
  const [todos, setTodos] = useState([]);

  // Load from Firestore and listen for real-time updates
  useEffect(() => {
    const q = query(collection(db, "todos"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setTodos(items);
      // Also save a local backup in case of offline use
      localStorage.setItem('todos', JSON.stringify(items));
    });

    // If Firestore fails, fall back to localStorage
    const saved = localStorage.getItem('todos');
    if (saved && todos.length === 0) {
      setTodos(JSON.parse(saved));
    }

    return () => unsubscribe();
  }, []);

  // Add a todo
  const addTodo = async ({ text, category }) => {
    const dateAdded = new Date().toLocaleDateString();
    const newTodo = {
      id: uuidv4(),
      text,
      category,
      done: false,
      dateAdded,
      createdAt: new Date()
    };
    // Add to Firestore
    await addDoc(collection(db, "todos"), newTodo);
    // Optional: local update will happen via onSnapshot
  };

  // Toggle completion
  const toggleDone = async (id) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;
    const todoRef = doc(db, "todos", id);
    await updateDoc(todoRef, { done: !todo.done });
    // local update will happen via onSnapshot
  };

  // Remove a todo
  const removeTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
    // local update will happen via onSnapshot
  };

  return { todos, addTodo, toggleDone, removeTodo };
}