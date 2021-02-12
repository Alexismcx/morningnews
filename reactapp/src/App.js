import React from 'react';
import './App.css';
import ScreenHome from './ScreenHome';
import ScreenArticlesBySource from './ScreenArticlesBySource';
import ScreenMyArticles from './ScreenMyArticles';
import ScreenSource from './ScreenSource';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import Item from 'antd/lib/list/Item';

import token from './reducer/token'
import selectedLang from './reducer/selectedLang'

import whishList from './reducer/article';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

const store = createStore(combineReducers({ whishList, token, selectedLang }));




function App() {
  return (
    <Provider store={store}>

      <Router>
        <div>
          <Switch>
            <Route path="/" exact component={ScreenHome} />
            <Route path="/screensources" exact component={ScreenSource} />
            <Route path="/screenmyarticles" exact component={ScreenMyArticles} />
            <Route path="/screenarticlesbysource/:id" exact component={ScreenArticlesBySource} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
