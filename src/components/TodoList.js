import React, { Component } from 'react'
import TodoItem from './TodoItem';
export default class TodoList extends Component {
  render() {
    return (
      <ul>
        {this.props.todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            setUpdate={this.props.setUpdate}
            handleChangeProps={this.props.handleChangeProps}
            deleteHandler={this.props.deleteHandler}
          />
        ))}
      </ul>
    );
  }
}
