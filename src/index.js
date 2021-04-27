import React from "react";
import ReactDOM from "react-dom";
//importing router for multiple urls
//must run npm install react-router-dom first in CLI!!
import {BrowserRouter} from "react-router-dom";
//stylesheet
import "./functionBased/App.css";
//component file
import TodoContainer from "./functionBased/components/TodoContainer";


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <TodoContainer />
    </BrowserRouter>
  </React.StrictMode>, 
document.getElementById("root"));

//the last line of code is rendering the react pages in conjunction 
//with the html element that was identified as the root page for the app.
//In this case, that is the div el inside the body el of index.html.