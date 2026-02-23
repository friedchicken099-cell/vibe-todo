import React, { useState, useEffect } from 'react';

export default function TodoItem({ todo, toggleDone, removeTodo }) {
  const [shaking, setShaking] = useState(false);

  const handleToggle = () => {
    toggleDone(todo.id);
    if (!todo.done) {
      setShaking(true); // only shake when marking done
    }
  };

  // Remove shaking class after animation completes
  useEffect(() => {
    if (shaking) {
      const timer = setTimeout(() => setShaking(false), 500); // match 0.5s animation
      return () => clearTimeout(timer);
    }
  }, [shaking]);

  return (
    <li className={shaking ? 'shaking' : ''} style={{
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '8px',
      padding: '8px',
      borderRadius: '4px',
      backgroundColor: todo.done ? '#4caf50' : '#404040',
      color: '#fff',
      transition: 'background-color 1s ease',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Custom checkbox */}
        <label style={{
          position: 'relative',
          width: '24px',
          height: '24px',
          cursor: 'pointer',
        }}>
          <input
            type="checkbox"
            checked={todo.done}
            onChange={handleToggle}
            style={{
              opacity: 0,
              width: '24px',
              height: '24px',
              position: 'absolute',
              left: 0,
              top: 0,
              cursor: 'pointer',
            }}
          />
          <span style={{
            display: 'block',
            width: '24px',
            height: '24px',
            backgroundColor: '#1e1e1e',
            borderRadius: '4px',
            border: '2px solid #555',
            transition: 'background-color 0.3s, border-color 0.3s',
          }}></span>
        </label>

        <span style={{
          textDecoration: todo.done ? 'line-through' : 'none',
          flex: 1,
        }}>
          {todo.text}
        </span>

        <button onClick={() => removeTodo(todo.id)} style={{
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          color: '#ff4d4f',
          fontWeight: 'bold'
        }}>✕</button>
      </div>
      <div style={{ marginTop: '4px', fontSize: '0.75rem', color: '#ccc' }}>
        Added: {todo.dateAdded}
      </div>
    </li>
  );
}