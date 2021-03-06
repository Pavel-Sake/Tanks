import React from "react";
import cn from 'classnames';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Home from './pages/home';
import About from './pages/about';
import NoFound from './pages/noFound';
import Game from './pages/game';

import Header from './components/header';
import Footer from './components/footer';
import Tank from './components/tank';

import styles from './style.pcss';

const App = () => {
  return (
    <div className={cn(styles.main)}>
      <Router>
        <>
          <Header/>
          {/*<Switch>*/}
          {/*  <Route*/}
          {/*    path={"/"}*/}
          {/*    component={Home}*/}
          {/*    exact*/}
          {/*  />*/}

          {/*  <Route*/}
          {/*    path={"/about"}*/}
          {/*    exact*/}
          {/*    component={About}*/}
          {/*  />*/}

          {/*  <Route*/}
          {/*    path={"/about/:id"}*/}
          {/*    component={Tank}*/}
          {/*  />*/}

          {/*  <Route*/}
          {/*    path={"/settings"}*/}
          {/*    render={() => <h2>settings</h2>}*/}
          {/*  />*/}

          {/*  <Route*/}
          {/*    path={"/game"}*/}
          {/*    component={Game}*/}
          {/*  />*/}

          {/*  <Route*/}
          {/*    path={"*"}*/}
          {/*    component={NoFound}*/}
          {/*  />*/}

          {/*  <Home/>*/}
          {/*</Switch>*/}
          <Game/>
          <Footer/>
        </>
      </Router>
    </div>
  );
};

export default App;