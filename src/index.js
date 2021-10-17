import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import store from "./js/store/index";
// import * as serviceWorker from './serviceWorker';
import PrimaryLayout from "./components/layout/primary/index";
import WelcomeLayout from "./components/layout/welcome/index";
import './assets/scss/index.scss';
import History from './general/lib/history';
import ScrollToTop from "./ScrollToTop";

ReactDOM.render(
  <Router history={History}>
    <Provider store={store}>
      <ScrollToTop >
        <Switch>
          <Route path="/admin" component={PrimaryLayout} />
          <Route path="/" component={WelcomeLayout} />

        </Switch>
      </ScrollToTop>
    </Provider>
  </Router>,
  document.getElementById('root')
);

// serviceWorker.unregister();
