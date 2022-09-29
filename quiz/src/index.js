import React from 'react';
import ReactDOM from 'react-dom';
import './StyleSheet/style.css';
import App from './Components/App';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

{
  /* <Header />
<Quiz />
<PlayQuiz />
<Tags /> */
}
