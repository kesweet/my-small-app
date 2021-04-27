import { React, useState, useEffect} from "react";
import TodosList from "./TodosList";
import Header from "./Header";
import InputTodo from "./InputTodo";
import { v4 as uuidv4 } from "uuid";
import {Route, Switch} from "react-router-dom";
import About from "../pages/About";
import NotMatch from "../pages/NotMatch";
import Navbar from "./Navbar";

const TodoContainer = (props) => {

  //here we are defining an array that is created under the hood using the useState() method.
  //when we call useState([]), we are creating an empty array with name todos.
  //useState() does all the work of defining the setTodos() method for you.
  const [todos, setTodos] = useState(getInitialTodos());


  const handleChange = (id) => {
    setTodos(prevState => prevState.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          }
        }
        return todo;
      })
    );
  };

  const deleteTodo = (id) => {
    setTodos([
      ...todos.filter(todo => {return todo.id !== id})
    ])
  };

  const addTodoItem = (title) => {
    const newTodo = {

      id: uuidv4(),
      title: title,
      completed: false

    };

    setTodos([...todos, newTodo])
  };

  const setUpdate = (updatedTitle, id) => {
    setTodos([todos.map(todo => {
        if (todo.id === id) {
          todo.title = updatedTitle
        }
        return todo
      }),
    ])
  }

  //CANNOT USE componentDidMount() or any other lifecycle methods in function components!!
  //here we are replacing lifecycle methods with useEffect() method from React. 
  //this method takes in a function and an optional array as parameters. The function
  //defines the side effect to run and the array defines when to rerun the effect
    //(i.e., at which stages in the lifecycle) by checking the depencies and their
    //current state instead of checking explicitly the lifecycle stage
  /*useEffect(() => {
    console.log("test run")
  
    // getting stored items
    const temp = localStorage.getItem("todos")
    const loadedTodos = JSON.parse(temp)
  
    if (loadedTodos) {
      setTodos(loadedTodos)
    }
  }, [setTodos]);*/
  //technically, setTodos is a dependency and so we added it to the array.
  //However, setTodos is stable and so React tells us we don't have to add it in to check for alterations.


  function getInitialTodos() {
    // getting stored items
    const temp = localStorage.getItem("todos")
    const savedTodos = JSON.parse(temp)
    return savedTodos || []
  }

  //we call this function to detect changes in the todos array
  //(hence why todos is an input into the dependency array)
  //and we set the function to alter the local storage in the browser to add the new todo item
  useEffect(() => {
    // storing todos items
    const temp = JSON.stringify(todos)
    localStorage.setItem("todos", temp)
  }, [todos]);
  

  return (
    //this is called the React fragment. 
    //Everything in JSX has to be wrapped into a single el, so you can't have
    //multiple Routes without wrapping all of them up into one thing
    <>

      <Navbar/>
      {/** This switch el runs through each Route 
      until it finds a matching path and then it quite searching */}
      <Switch>
        {/*this path will render these el for any url (the single / tells it to do that)
        to use exact path for the base path of the url, use exact path = "/" */}
          <Route exact path="/">
            <div className="container">
              <div className="inner">
                <Header />
                <InputTodo
                  addTodoProps={addTodoItem}
                />
                <TodosList 
                todos={todos} 
                handleChangeProps={handleChange}
                deleteTodoProps={deleteTodo}
                setUpdate={setUpdate}
                />
              </div>
            </div>
          </Route>
          {/** Because of the way this switch el works,
          make sure you declare MORE specific paths before LESS specific ones.
          For instance, if you have an /about/katherine path, place it here
          BEFORE you list the /about path. */}
          
          {/**The method used below is for when using Hooks/functions as components.
            When using standard classes as Components, you specify the component in each Route:
          <Route path="/about" component={About}/>*/}
          <Route path="/about">
            <About/>

          </Route>
            
          {/** This path="*" will render for any url path given, 
          but because it comes at the end of the switch statement,
          it only renders when no paths listed above were a match */}
          <Route path="*">
            <NotMatch/>
          </Route>
      </Switch>

    {/*React fragment*/}
    </>
  )


}
export default TodoContainer