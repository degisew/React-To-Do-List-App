/* eslint-disable */
import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodoList from './TodoList';
import Header from './Header';
import InputTodo from './InputTodo';

export default class TodoContainer extends Component {
  state = {
    todos: [],
  };

  // fetch data from Json Placeholder API
  // componentDidMount() {
  //   fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
  //     .then((response) => response.json())
  //     .then((data) => this.setState({ todos: data }));
  // }

  // edit todos
  setUpdate = (updatedTitle, id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.title = updatedTitle;
        }
        return todo;
      }),
    });
  };

  handleChange = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      }),
    }));
  };

  deleteItem = (id) => this.setState({
    todos: [
      ...this.state.todos.filter((item) => item.id !== id),
    ],
  });

  addTodoItem = (title) => {
    const newTodo = {
      id: uuidv4(),
      title,
      completed: false,
    };
    this.setState({
      todos: [...this.state.todos, newTodo],
    });
  };

  componentDidMount() {
    const temp = localStorage.getItem('todos');
    const loadedTodos = JSON.parse(temp);
    if (loadedTodos) {
      this.setState({
        todos: loadedTodos,
      });
    }
  }

  // persist todo data in loccal storage
  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      const temp = JSON.stringify(this.state.todos);
      localStorage.setItem('todos', temp);
    }
  }

  render() {
    return (
      <div className="container">
        <div className="inner">
          <Header />
          <InputTodo addTodoProps={this.addTodoItem} />
          <TodoList
            todos={this.state.todos}
            setUpdate={this.setUpdate}
            handleChangeProps={this.handleChange}
            deleteHandler={this.deleteItem}
          />
        </div>
      </div>
    );
  }
}
