
//same as import React from "react" except separating out the Component class of React to use
import React, {useState, useEffect} from "react";
import styles from "./TodoItem.module.css";
//this import is for icons - must first run in CLI: npm install react-icons --save
import {FaTrash} from "react-icons/fa";

const TodoItem = (props) => {

  const [editing, setEditing] = useState(false);

  const handleEditing = () => {
    setEditing(true);
  }

  const handleUpdatedDone = (event) => {

    if (event.key === "Enter" || event.onDoubleClick) {

      setEditing(false);
    }
  }

  //if we don't input the empty array, 
  //then this function will execute anytime any change is made in the view
  //if we add an empty array, this will only execute right before unmounting (of any element)
  useEffect(() => {
    return () => {
      console.log("Cleaning up...")
    }
  }, []);


  const completedStyle = {
    fontStyle: "italic",
    color: "#595959",
    opacity: 0.4,
    textDecoration: "line-through",
  };

  const { completed, id, title } = props.todo;

  let viewMode = {};
  let editMode = {};

  if (editing) {
    viewMode.display = "none";
  } else {

    editMode.display = "none";
  }

  return (
      <li className={styles.item}>
        <div onDoubleClick={handleEditing} style={viewMode}>
          <input
            className={styles.checkbox}
            type="checkbox"
            checked={completed}
            onChange={() => {props.handleChangeProps(id)}}/>
            
          <button onClick={() => props.deleteTodoProps(id)}><FaTrash style={{ color: "orangered", fontSize: "16px" }} /></button>
          <span style={(completed) ? (completedStyle) : (null)}>
            {title}
          </span>
        </div>
        <div onDoubleClick={handleUpdatedDone}>
        <input
        type="text"
        style={editMode}
        value={title}
        onKeyDown={handleUpdatedDone}
        onChange={e => {
          props.setUpdate(e.target.value, id)
        }}
        className={styles.textInput}/>
        </div>
      </li>
  )

}
export default TodoItem