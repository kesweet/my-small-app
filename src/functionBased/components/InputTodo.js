import React, { useState } from "react";
import {FaPlusCircle} from "react-icons/fa";


const InputTodo = props => {
  const [inputText, setInputText] = useState({
    title: "",
  })

  //the input e is the React synthetic event created when an event occurs
  const onChange = (e) => {
    setInputText({
      ...inputText,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = e => {
    //preventDefault is called on React synthetic events
    // to prevent html standard responses to events from occurring
    e.preventDefault();
    if (inputText.title.trim()) {
      props.addTodoProps(inputText.title)
      setInputText({
        title: "",
      })
    } else {
      alert("Please write item")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input
        type="text"
        className="input-text"
        placeholder="Add todo..."
        value={inputText.title}
        name="title"
        onChange={onChange}
      />
      <button className="input-submit"><FaPlusCircle color="darkcyan" size="30px"/></button>
    </form>
  )
}

export default InputTodo