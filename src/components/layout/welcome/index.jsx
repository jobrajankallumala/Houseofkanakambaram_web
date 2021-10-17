import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom";
import routes from "../../../routes";
import Header from "./Header";
import Footer from "./Footer";
import { WelcomeRoute } from '../../../general/router/welcome/Index';
export default class index extends Component {
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "welcome") {
        return (
          <WelcomeRoute
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
        <Header />
        <Switch>{this.getRoutes(routes)}</Switch>

        <Footer /> 
      </>
    )
  }
}
