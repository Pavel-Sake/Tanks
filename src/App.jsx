import React from "react";
import cn from 'classnames';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Home from './pages/home/home';
import About from './pages/about/about';
import Header from './components/header/header';
import Footer from './components/footer/footer';

import Item from './components/item/item';

import styles from './style.pcss';


const App = () => {
  return (
    <div className={cn(styles.main)}>
      <Router>
        <React.Fragment>

          <Header/>
          <Switch>
            <Route path={"/home"}
                   component={Home}
                   exact={true}/>
            

            <Route path={"/about"}
                   exact
                   component={About}
            />
            <Route path={"/about/:id"}
                   component={Item}
            />


            <Route path={"/settings"}
                   render={() => <h2>settings</h2>}/>

            {/*<Redirect from='/' to='/home'/>*/}

            <Home/>
          </Switch>
          <Footer/>

          </React.Fragment>
      </Router>


  </div>
  )
}

export default App;