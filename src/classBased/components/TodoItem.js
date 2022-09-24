/* eslint-disable */
import React, { Component } from "react";
import styles from "./TodoItem.module.css";

export default class TodoItem extends Component {
  state = {
    editing: false,
  };

  handleEditing = () => {
    this.setState({
      editing: true,
    });
  };

  // handle keyDown() event
  handleUpdatedDone = (event) => {
    if (event.key === "Enter") {
      this.setState({ editing: false });
    }
  };

  render() {
    // destructuring
    const { id, completed, title } = this.props.todo;
    const completedStyle = {
      fontStyle: "italic",
      color: "#595959",
      opacity: 0.4,
      textDecoration: "line-through",
    };
    const viewMode = {};
    const editMode = {};

    if (this.state.editing) {
      viewMode.display = "none";
    } else {
      editMode.display = "none";
    }
    return (
      <li className={styles.item}>
        <div onClick={this.handleEditing} style={viewMode}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={completed}
            onChange={() => this.props.handleChangeProps(id)}
          />
          <button onClick={() => this.props.deleteHandler(id)}>Delete</button>
          <span style={completed ? completedStyle : null}>{title}</span>
        </div>
        <input
          type="text"
          value={title}
          className={styles.textInput}
          onChange={(e) => {
            this.props.setUpdate(e.target.value, id);
          }}
          onKeyDown={this.handleUpdatedDone}
          style={editMode}
        />
      </li>
    );
  }
}
