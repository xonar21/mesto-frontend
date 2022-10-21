import React from "react";
import { Route, Redirect } from "react-router-dom";


const ProtectedRoute = (props) => {
  return (
    <Route path={props.path}>
      {() =>
        props.loggedIn ? props.children : <Redirect to="./sign-in" />
      }
    </Route>
  );
};

export default ProtectedRoute; 