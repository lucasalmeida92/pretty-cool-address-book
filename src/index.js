import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import './normalize.css';
import './index.css';
import Layout from './layouts/Default';
import Home from './pages/Home';
import CreateAddress from './pages/CreateAddress';
import EditAddress from './pages/EditAddress';

const theme = {};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/"><Home /></Route>
            <Route exact path="/create-address"><CreateAddress /></Route>
            {/* <Route exact path="/edit-address/:id"><EditAddress /></Route> */}
            <Redirect to="/" />
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

