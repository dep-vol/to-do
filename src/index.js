import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import './index.css';
import Authorize from "./components/Authorize/Authorize";
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Registration from "./components/Registration/Registration";


ReactDOM.render(
  <Router>
    <Route path='/' component={Authorize} exact />
    <Route path='/registration' component={Registration} exact />
    <Route path='/main' component={App} exact />
  </Router>,
  document.getElementById('root'));


