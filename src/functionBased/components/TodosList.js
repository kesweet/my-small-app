import React from "react"
import TodoItem from "./TodoItem";

const TodosList = (props) => {
//cannot use this keyword with functions as components!


//cannot have a render function, since you are defining a function. Must just use return
  return (
    <ul>
      {props.todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            handleChangeProps={props.handleChangeProps}
            deleteTodoProps={props.deleteTodoProps}
            setUpdate={props.setUpdate}
          />
      ))}
    </ul>
  )


}

export default TodosList