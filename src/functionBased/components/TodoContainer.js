/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import InputTodo from './InputTodo';
import Header from './Header';
import TodoList from './TodoList';
import About from '../pages/About';
import NotMatch from '../pages/NoMatch';
import Navbar from './Navbar';

const TodoContainer = () => {
  function getInitialTodos() {
    // getting stored items
    const temp = localStorage.getItem('todos');
    const savedTodos = JSON.parse(temp);
    return savedTodos || [];
  }
  // useState Hook
  const [todos, setTodos] = useState(getInitialTodos());
  // useEffect Hook
  useEffect(() => {
    // storing todos items
    const temp = JSON.stringify(todos);
    localStorage.setItem('todos', temp);
  });

  const handleChange = (id) => {
    setTodos((prevState) => prevState.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    }));
  };

  const delTodo = (id) => {
    setTodos([...todos.filter((todo) => todo.id !== id)]);
  };

  const addTodoItem = (title) => {
    const newTodo = {
      id: uuidv4(),
      title,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const setUpdate = (updatedTitle, id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.title = updatedTitle;
        }
        return todo;
      }),
    );
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={(
            <div className="container">
              <div className="inner">
                <Header />
                <InputTodo addTodoProps={addTodoItem} />
                <TodoList
                  todos={todos}
                  handleChangeProps={handleChange}
                  deleteTodoProps={delTodo}
                  setUpdate={setUpdate}
                />
              </div>
            </div>
          )}
        />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotMatch />}>
          {' '}
        </Route>
      </Routes>
    </>
  );
};

export default TodoContainer;
