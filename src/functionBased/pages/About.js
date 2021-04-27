import React from "react";
//we need this to check and see all the route properties of this component.
import {useRouteMatch, Link, Route} from "react-router-dom";
import SinglePage from "./SinglePage";

const About = (props) => {
  console.log(useRouteMatch());

  const {url, path} = useRouteMatch();


  return (
    <div>
      <ul>
        <li>
          <Link to={`${url}/about-app`}>About App</Link>
        </li>
        <li>
          <Link to={`${url}/about-author`}>About Author</Link>
        </li>
      </ul>
      {/** The slug can be any word - it's just a variable name for the
       */}
      <Route path={`${path}/:slug`}>
        <SinglePage />
      </Route>
    </div>
  )
}
export default About