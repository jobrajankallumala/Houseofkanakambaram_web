import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom";
import protectedRoutes from "../../../protectedRoutes";
import { ProtectedRoute } from '../../../general/router/protected/Index';
// import Footer from "./footer";
export default class index extends Component {
  // getRoutes = routes => {
  //   return routes.map((prop, key) => {
  //     if (prop.layout === "primary") {
  //       return (
  //         <Route key={key} onUpdate={() => window.scrollTo(0, 0)}
  //           path={prop.path}
  //           component={prop.component}
  //         />
  //       );
  //     } else {
  //       return null;
  //     }
  //   });
  // };
  getProtectedRoutes = protectedRoutes => {
    return protectedRoutes.map((prop, key) => {
      if (prop.layout === "primary") {

        return (
          <ProtectedRoute
            exact={prop.exact}
            path={prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  render() {
    return (
      <>
        {/* <Header /> */}
        <div className="page-content">
          <Switch>{this.getProtectedRoutes(protectedRoutes)}</Switch>
        </div>
       
      </>
    )
  }
}
